import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { describe, it, expect } from 'vitest';

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
  const secret = getJwtSecret();

  it('should return a string', () => {
    expect(typeof secret).toBe('string');
  });
  it('should return a non-empty string', () => {
    expect(secret.length).toBeGreaterThan(0);
  });
});

/**
  * @decription tests for getUserId function
  */
describe('getUserId', () => {
  const expired = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsIm5pY2tuYW1lIjoiaWNhcmlvcyIsInNpdHVhdGlvbiI6ImNyZWF0b3IiLCJpYXQiOjE2OTczODgyNzYsImV4cCI6MTY5NzQzMTQ3Nn0.lWT3SiE8DuSh6jnVvcaUipct9fx_1Rm8gWzoiABrQbc';

  it('should throw an error if authHeader is not a string', () => {
    expect(() => getUserId(123)).toThrow('Authorization header is missing or invalid');
  });
  it('should throw an error if authHeader does not start with Bearer', () => {
    expect(() => getUserId('invalid.header')).toThrow('Authorization header is missing or invalid');
  });
  it('should throw an error if authHeader is too short', () => {
    expect(() => getUserId('Bearer ')).toThrow('Authorization header is missing or invalid');
  });
  it('should throw an error if token is invalid', () => {
    expect(() => getUserId('Bearer invalid.token')).toThrow('Invalid or expired token');
  });
  it('should throw an error if token is expired', () => {
    expect(() => getUserId('Bearer ' + expired)).toThrow('Invalid or expired token');
  });
  it('should throw an error if token payload is missing id', () => {
    const badToken = makeToken({ id: undefined });

    expect(() => getUserId('Bearer ' + badToken)).toThrow('Invalid token payload');
  });
  it('should throw an error if token payload id is not a number', () => {
    const badToken = makeToken({ id: 'not a number' as unknown as number });

    expect(() => getUserId('Bearer ' + badToken)).toThrow('Invalid token payload');
  });
  it('should throw an error if token payload is missing nickname', () => {
    const badToken = makeToken({ nickname: undefined });

    expect(() => getUserId('Bearer ' + badToken)).toThrow('Invalid token payload');
  });
  it('should throw an error if token payload nickname is not a string', () => {
    const badToken = makeToken({ nickname: 123 as unknown as string });

    expect(() => getUserId('Bearer ' + badToken)).toThrow('Invalid token payload');
  });
  it('should throw an error if token payload is missing situation', () => {
    const badToken = makeToken({ situation: undefined });

    expect(() => getUserId('Bearer ' + badToken)).toThrow('Invalid token payload');
  });
  it('should throw an error if token payload situation is not a string', () => {
    const badToken = makeToken({ situation: 123 as unknown as string });

    expect(() => getUserId('Bearer ' + badToken)).toThrow('Invalid token payload');
  });
  it('should throw an error if token payload is null', () => {
    const badToken = jwt.sign({} as unknown as object, getJwtSecret(), { expiresIn: '1h' });

    expect(() => getUserId('Bearer ' + badToken)).toThrow('Invalid token payload');
  });
  it('should throw an error if token payload is not an object', () => {
    const badToken = jwt.sign('just a string' as unknown as object, getJwtSecret());

    expect(() => getUserId('Bearer ' + badToken)).toThrow('Invalid token payload');
  });
  it('should return user ID if token is valid', () => {
    const token = makeToken();

    expect(getUserId('Bearer ' + token)).toBe(1); // Assuming the valid token decodes to user ID 1
  });
});

/**
  * @decription tests for findOwner function
  */
describe('findOwner', () => {
  it('should throw an error if entity is invalid', async () => {
    await expect(findOwner('invalid' as unknown as 'artworks', '1')).rejects.toThrow('Module invalid not found');
  });
  it('should throw an error if entityId does not exist', async () => {
    await expect(findOwner('artworks', '99999')).rejects.toThrow('Entity not found');
  });
  it('should return ownerId if entityId exists', async () => {
    await expect(findOwner('artworks', '1')).resolves.toBe(2); // Assuming artwork with ID 1 is owned by user ID 2
  });
});

/**
  * @decription tests for checkSignedIn function
  */
describe('checkSignedIn', () => {
  it('should return true if user is signed in', () => {
    expect(checkSignedIn('Bearer ' + makeToken())).toBe(true);
  });
  it('should return false if user is not signed in', () => {
    expect(checkSignedIn('Bearer invalid.token')).toBe(false);
  });
});
