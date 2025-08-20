import type { JwtPayload } from 'jsonwebtoken';

export type Situation =
  | 'user'
  | 'admin'
  | 'creator';

export type User = {
  id: number,
  nickname: string,
  situation: Situation,
}

/**
 * Payload JWT attendu pour nos utilisateurs.
 * Contient les champs du User + les métadonnées JWT standards.
 */
export type UserJwtPayload = JwtPayload & User;

export type Entity =
  | 'artworks'
  | 'collections'
  | 'comments';
