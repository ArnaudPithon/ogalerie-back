import jwt from 'jsonwebtoken';

import { assert } from 'infrastructure/shared/utils.js';
import APIError from '@/infrastructure/shared/APIError.js';
import { logEvent } from '@/interfaces/logger/logger.js';

import type { Entity, UserJwtPayload } from '@/types/auth.js';

export function getJwtSecret() {
  const jwtSecret = process.env.JWT_SECRET;

  if (typeof jwtSecret !== 'string' || jwtSecret.length <= 0) {
    throw new APIError('No JWT secret defined', 500);
  };

  return jwtSecret;
}

function isBearerToken(authHeader: unknown): authHeader is `Bearer ${string}` {
  return typeof authHeader === 'string'
    && authHeader.startsWith('Bearer ')
    && authHeader.length > 7;
}

function collectToken(authHeader: unknown): string {
  if (!isBearerToken(authHeader)) {
    throw new APIError('Authorization header is missing or invalid', 401);
  }

  return authHeader.split(' ')[1] as string;
}

function isUserJwtPayload(payload: unknown): payload is UserJwtPayload {
  return (
    typeof payload === 'object'
    && payload !== null
    && typeof (payload as UserJwtPayload).id === 'number'
    && typeof (payload as UserJwtPayload).nickname === 'string'
    && typeof (payload as UserJwtPayload).situation === 'string'
  );
}

/**
 * @summary Vérification d'un token JWT
 */
function verifyToken(token: string): UserJwtPayload {
  let decoded: string | jwt.JwtPayload;

  try {
    decoded = jwt.verify(token, getJwtSecret());
  } catch {
    throw new APIError('Invalid or expired token', 401);
  }

  if (!isUserJwtPayload(decoded)) {
    throw new APIError('Invalid token payload', 401);
  }

  return decoded;
}

function isUserConnected(token: string): boolean {
  return Boolean(verifyToken(token));
}

export async function findOwner(entity: Entity, entityId: string): Promise<number> {
  let dataMapper: Record<'default', Record<'getOwner', Function>>;

  try {
    dataMapper = await import(`@/modules/${entity}/model.js`);
  } catch {
    throw new APIError(`Module ${entity} not found`, 404);
  }

  try {
    const { ownerId } = await dataMapper.default.getOwner(entityId);

    assert(ownerId);

    return ownerId;
  } catch {
    throw new APIError('Entity not found', 404);
  }
}

/**
 * @summary Récupération de l'ID de l'utilisateur à partir du token JWT
 */
export function getUserId(authHeader: unknown): number {
  const token = collectToken(authHeader);

  return verifyToken(token).id;
}

/**
 * @summary Vérification si l'utilisateur est connecté
 */
export function checkSignedIn(authHeader: unknown): boolean {
  try {
    const token = collectToken(authHeader);

    return isUserConnected(token);
  } catch (err) {
    logEvent('User not connected', { err });

    return false;
  }
}
