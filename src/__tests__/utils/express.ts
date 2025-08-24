import type { Request, Response } from 'express';

/**
 * @summary Mock an Express Request object
 * @example
 * const req = mockRequest({ authorization: `Bearer ${token}` });
 * const req = { headers: { authorization: `Bearer ${token}` } } as unknown as Request;
 */
export function mockRequest(headers: Record<string, string> = {}): Request {
  return { headers } as unknown as Request;
};

/**
 * @summary Mock an Express Response object
  * @returns {Response} A mock Response object
  * @example
  * const res = mockResponse();
  * const res = {} as Response;
*/
export function mockResponse(): Response {
  return {} as Response;
};
