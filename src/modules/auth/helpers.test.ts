import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { describe, it, expect, beforeEach, afterAll } from 'vitest';

import {
  checkSignedIn,
  findOwner,
  getJwtSecret,
  getUserId,
} from './helpers.js';

/**
 * @description helper function to create a valid JWT for testing
 */
function makeToken(overrides: Partial<{ id: number; nickname: string, situation: string }> = {}) {
  const SECRET = getJwtSecret();
  const payload = { id: 1, nickname: 'unexistant', situation: 'admin', ...overrides };

  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

/**
 * @description tests for getJwtSecret function
 */
describe('getJwtSecret', () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('return the JWT secret', () => {
    process.env.JWT_SECRET = 'yodkaimedPhetFilt4WrifralGhalbil';

    expect(getJwtSecret()).toBe(process.env.JWT_SECRET); // should return the same secret each time
  });

  it('throws if no secret is defined', () => {
    delete process.env.JWT_SECRET;

    expect(() => getJwtSecret()).toThrow('No JWT secret defined');
  });
});

/**
  * @description tests for getUserId function
  */
describe('getUserId', () => {
  it('return user ID for a valid token', () => {
    const token = makeToken();

    expect(getUserId('Bearer ' + token)).toBe(1); // Assuming the valid token decodes to user ID 1
  });
  it('throws if header is missing or invalid', () => {
    expect(() => getUserId(123)).toThrow('Authorization header is missing or invalid');
    expect(() => getUserId('invalid.header')).toThrow('Authorization header is missing or invalid');
    expect(() => getUserId('Bearer ')).toThrow('Authorization header is missing or invalid');
  });
  it('throws if token is invalid or expired', () => {
    const expiredToken = jwt.sign({ id: 42, nickname: 'Nick', situation: 'user' }, getJwtSecret(), { expiresIn: '-1s' });

    expect(() => getUserId('Bearer invalid.token')).toThrow('Invalid or expired token');
    expect(() => getUserId('Bearer ' + expiredToken)).toThrow('Invalid or expired token');
  });
  describe('payload malformed', () => {
    const invalidPayloads = [
      { case: 'missing id', overrides: { id: undefined } },
      { case: 'id not a number', overrides: { id: 'not a number' as unknown as number } },
      { case: 'missing nickname', overrides: { nickname: undefined } },
      { case: 'nickname not a string', overrides: { nickname: 123 as unknown as string } },
      { case: 'missing situation', overrides: { situation: undefined } },
      { case: 'situation not a string', overrides: { situation: 123 as unknown as string } },
    ];

    it.each(invalidPayloads)('throws if token payload is $case', ({ overrides }) => {
      const badToken = makeToken(overrides);

      expect(() => getUserId('Bearer ' + badToken)).toThrow('Invalid token payload');
    });
    it('throws if token payload is null', () => {
      const badToken = jwt.sign({} as unknown as object, getJwtSecret(), { expiresIn: '1h' });

      expect(() => getUserId('Bearer ' + badToken)).toThrow('Invalid token payload');
    });
    it('throws if token payload is not an object', () => {
      const badToken = jwt.sign('just a string' as unknown as object, getJwtSecret());

      expect(() => getUserId('Bearer ' + badToken)).toThrow('Invalid token payload');
    });
  });
});

/**
  * @description tests for findOwner function
  */
describe('findOwner', () => {
  it('return owner ID if entity exists', async () => {
    await expect(findOwner('artworks', '1'))
      .resolves.toBe(2); // Assuming artwork with ID 1 is owned by user ID 2
  });
  it("throws if entity can't be found", async () => {
    await expect(findOwner('invalid' as unknown as 'artworks', '1'))
      .rejects.toThrow('Module invalid not found');
    await expect(findOwner('artworks', '99999'))
      .rejects.toThrow('Entity not found');
  });
});

/**
  * @description tests for checkSignedIn function
  */
describe('checkSignedIn', () => {
  it('return true if user is signed in', () => {
    expect(checkSignedIn('Bearer ' + makeToken())).toBe(true);
  });
  it('return false otherwise', () => {
    expect(checkSignedIn('Bearer invalid.token')).toBe(false);
  });
});
