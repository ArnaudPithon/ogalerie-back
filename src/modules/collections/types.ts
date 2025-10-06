import type { Artwork } from '../../types/artwork.js';

export type Collection = {
  id: number;
  title: string;
  owner_id: number;
  owner: string;
  created_at: Date;
  updated_at: Date;
  artworks?: Artwork[];
}

