import jwt from 'jsonwebtoken';

import APIError from '@/infrastructure/shared/APIError.js';
import { toBool } from '@/infrastructure/shared/utils.js';

import type { Entity, UserJwtPayload } from '@/types/auth.d.js';

export function getJwtSecret() {
  const jwtSecret = process.env.JWT_SECRET;

  if (typeof jwtSecret !== 'string' || jwtSecret.length <= 0) {
    throw new APIError('No JWT secret defined', 500);
  };

  return jwtSecret;
}

function isBearerToken(authHeader: unknown): authHeader is `Bearer ${string}` {
  return typeof authHeader === 'string' && authHeader.startsWith('Bearer ');
}

function collectToken(authHeader: unknown): string {
  if (!isBearerToken(authHeader)) {
    throw new APIError('Authorization header is missing or invalid', 401);
  }

  return authHeader.split(' ')[1];
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
  try {
    const decoded = jwt.verify(token, getJwtSecret());

    if (!isUserJwtPayload(decoded)) {
      throw new APIError('Invalid token payload', 401);
    }

    return decoded;
  } catch {
    throw new APIError('Invalid or expired token', 401);
  }
}

function isUserConnected(token: string): boolean {
  return toBool(verifyToken(token));
}

export async function findOwner(entity: Entity, entityId: string): Promise<number> {
  const dataMapper = await import(`@/modules/${entity}/model.js`);
  const { ownerId } = await dataMapper.getOwner(entityId);

  if (!ownerId) {
    throw new APIError('Entity not found', 404);
  }

  return ownerId;
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
  const token = collectToken(authHeader);

  return isUserConnected(token);
}
