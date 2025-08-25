import jwt from 'jsonwebtoken';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import type { Request } from 'express';
import APIError from '@/infrastructure/shared/APIError.js';
import { mockRequest, mockResponse } from '@/__tests__/utils/express.js';
import * as helpers from './helpers.js';
import { securityService } from './security.js';

describe('securityService', () => {
  beforeEach(() => {
    process.env.JWT_SECRET = 'yodkaimedPhetFilt4WrifralGhalbil';
  });

  afterEach(() => {
    process.env.JWT_SECRET = undefined;
    vi.restoreAllMocks();
  });

  /**
    * @description tests for getToken function
    */
  describe('getToken', () => {

    it('return a valid JWT token', async () => {
      const jwtToken = securityService.getToken({ id: 1, nickname: 'test', situation: 'user' });

      expect(jwt.decode(jwtToken)).toMatchObject({ id: 1, nickname: 'test', situation: 'user' });
      expect(() => jwt.verify(jwtToken, process.env.JWT_SECRET!)).not.toThrow();
    });
  });

  /**
    * @description tests for connectionRequired function
    * @note these tests use mocking to isolate the middleware logic
    * @note integration tests are provided below
    */
  describe('connectionRequired', () => {

    describe('unit', () => {
      /**
      * @note this test assumes that checkSignedIn identifies a valid
      * token and returns true while connection is required
      */
      it('let request pass when required and connected', () => {
        vi.spyOn(helpers, 'checkSignedIn').mockReturnValue(true);
        const middleware = securityService.connectionRequired(true);

        const req = mockRequest({ authorization: 'Bearer valid.token' });
        const res = mockResponse();
        const next = vi.fn();

        middleware(req, res, next);

        expect(req.isConnected).toBe(true);
        expect(next).toHaveBeenCalled();
      });

      /**
      * @note this test assumes that checkSignedIn identifies a invalid
      * token and returns false while connection is not required
      */
      it('let request pass when not required and not connected', () => {
        vi.spyOn(helpers, 'checkSignedIn').mockReturnValue(false);
        const middleware = securityService.connectionRequired(false);

        const req = mockRequest({});
        const res = mockResponse();
        const next = vi.fn();

        middleware(req, res, next);

        expect(req.isConnected).toBe(false);
        expect(next).toHaveBeenCalled();
      });

      /**
      * @note this test assumes that checkSignedIn identifies an invalid
      * token and returns false while connection is required
      */
      it('throws APIError when required and not connected', () => {
        vi.spyOn(helpers, 'checkSignedIn').mockReturnValue(false);
        const middleware = securityService.connectionRequired(true);

        const req = mockRequest({ authorization: 'Bearer invalid.token' });
        const res = mockResponse();
        const next = vi.fn();

        expect(() => middleware(req, res, next)).toThrowError(
          new APIError('You must be connected to access this resource', 401),
        );
        expect(next).not.toHaveBeenCalled();
      });
    });

    /**
      * @description integration tests for connectionRequired function
      * @note these tests use real JWT tokens to test the full flow
      * @note mocking is not used here
      * @note requires a valid JWT secret in env
      */
    describe('integration', () => {

      /**
      * @note this test creates a real JWT that is valid
      */
      it('let request pass with a real valid JWT', () => {
        const token = securityService.getToken({ id: 123, nickname: 'test', situation: 'user' });

        const req = mockRequest({ authorization: `Bearer ${token}` });
        const res = mockResponse();
        const next = vi.fn();

        const middleware = securityService.connectionRequired(true);

        middleware(req, res, next);

        expect(req.isConnected).toBe(true);
        expect(next).toHaveBeenCalled();
      });

      /**
      * @note this test uses a structurally valid JWT but with an invalid
      * signature
      */
      it('throws with a real invalid JWT', () => {
        const req = mockRequest({ authorization: 'Bearer faketoken.123.456' });
        const res = mockResponse();
        const next = vi.fn();

        const middleware = securityService.connectionRequired(true);

        expect(() => middleware(req, res, next)).toThrowError(
          new APIError('You must be connected to access this resource', 401),
        );
        expect(next).not.toHaveBeenCalled();
      });

      /**
      * @note this test creates a real JWT that is already expired
      */
      it('throws with a real expired JWT', () => {
        const payload = { id: 123, nickname: 'test', situation: 'user' };
        const SECRET = helpers.getJwtSecret();
        const token = jwt.sign(payload, SECRET, { expiresIn: '-1h' }); // Expired 1 hour ago

        const req = mockRequest({ authorization: `Bearer ${token}` });
        const res = mockResponse();
        const next = vi.fn();

        const middleware = securityService.connectionRequired(true);

        expect(() => middleware(req, res, next)).toThrowError(
          new APIError('You must be connected to access this resource', 401),
        );
        expect(next).not.toHaveBeenCalled();
      });
    });
  });

  /**
   * @description tests for checkIdentity function
   * @note these tests use real JWT tokens to test the full flow
   * @note mocking is not used here
   * @note requires a valid JWT secret in env
   */
  describe('checkIdentity', () => {

    /**
     * @note this test assumes that the mocked user ID is the same
     * as the ID in params
     */
    it('sets req.isUser to true when IDs match', () => {
      const userId = 123;

      const token = securityService.getToken({ id: userId, nickname: 'test', situation: 'user' });
      const req = { params: { id: userId }, headers: { authorization: `Bearer ${token}` } } as unknown as Request;
      const res = mockResponse();
      const next = vi.fn();

      const middleware = securityService.checkIdentity;

      middleware(req, res, next);

      expect(req.isUser).toBe(true);
      expect(next).toHaveBeenCalled();
    });

    /**
     * @note this test assumes that the mocked user ID is different
     * from the ID in params
     */
    it('sets req.isUser to false when IDs do not match', () => {
      const userId = 123;
      const pretendId = userId + 1;

      const token = securityService.getToken({ id: userId, nickname: 'test', situation: 'user' });
      const req = { params: { id: pretendId }, headers: { authorization: `Bearer ${token}` } } as unknown as Request;
      const res = mockResponse();
      const next = vi.fn();

      const middleware = securityService.checkIdentity;

      middleware(req, res, next);

      expect(req.isUser).toBe(false);
      expect(next).toHaveBeenCalled();
    });

    /**
     * @note this test covers cases where the id param is missing or not
     * a valid number (null, undefined, string or NaN)
     */
    it('throws if identity cannot be confirmed', () => {
      const pretendId = NaN;

      const token = securityService.getToken({ id: 123, nickname: 'test', situation: 'user' });
      const req = { params: { id: pretendId }, headers: { authorization: `Bearer ${token}` } } as unknown as Request;
      const res = mockResponse();
      const next = vi.fn();

      const middleware = securityService.checkIdentity;

      expect(() => middleware(req, res, next)).toThrowError(
        new APIError('Cannot confirm identity', 400),
      );
      expect(req.isUser).toBe(false);
    });
  });

  /**
   * @description tests for checkOwner function
   */
  describe('checkOwner', () => {

    describe('unit', () => {
      it('sets req.isOwner to true when user owns the entity', async () => {
        const userId = 123;

        vi.spyOn(helpers, 'getUserId').mockReturnValue(userId);
        vi.spyOn(helpers, 'findOwner').mockResolvedValue(userId);

        const req = { params: { id: 222 }, headers: { authorization: 'Bearer valid.token' } } as unknown as Request;
        const res = mockResponse();
        const next = vi.fn();

        const middleware = securityService.checkOwner('artworks');

        await middleware(req, res, next);

        expect(req.isOwner).toBe(true);
        expect(next).toHaveBeenCalled();
      });

      it('sets req.isOwner to false when user does not own the entity', async () => {
        const userId = 123;
        const ownerId = userId + 1;

        vi.spyOn(helpers, 'getUserId').mockReturnValue(userId);
        vi.spyOn(helpers, 'findOwner').mockResolvedValue(ownerId);

        const req = { params: { id: 222 }, headers: { authorization: 'Bearer valid.token' } } as unknown as Request;
        const res = mockResponse();
        const next = vi.fn();

        const middleware = securityService.checkOwner('artworks');

        await middleware(req, res, next);

        expect(req.isOwner).toBe(false);
        expect(next).toHaveBeenCalled();
      });

      it('throws if entity identity cannot be confirmed', async () => {
        const entityId = NaN;

        vi.spyOn(helpers, 'getUserId').mockReturnValue(123);
        vi.spyOn(helpers, 'findOwner').mockResolvedValue(123);

        const req = { params: { id: entityId }, headers: { authorization: 'Bearer valid.token' } } as unknown as Request;
        const res = mockResponse();
        const next = vi.fn();

        const middleware = securityService.checkOwner('artworks');

        await expect(middleware(req, res, next)).rejects.toThrowError(
          new APIError('Cannot identify the entity', 400),
        );
        expect(next).not.toHaveBeenCalled();
      });
    });

    /**
     * @note these tests use mocking to isolate the middleware logic
     * @note requires a valid JWT secret in env
     */
    describe('integration', () => {
      /**
       * @note this test assumes that the mocked owner ID is the same
       * as the user ID
       */
      it('correctly links JWT userId with owner check', async () => {
        const userId = 123;

        const token = securityService.getToken({ id: userId, nickname: 'test', situation: 'user' });
        const req = { params: { id: 222 }, headers: { authorization: `Bearer ${token}` } } as unknown as Request;
        const res = mockResponse();
        const next = vi.fn();

        vi.spyOn(helpers, 'findOwner').mockResolvedValue(userId);
        const middleware = securityService.checkOwner('artworks');

        await middleware(req, res, next);

        expect(req.isOwner).toBe(true);
        expect(next).toHaveBeenCalled();
      });
    });
  });
});
