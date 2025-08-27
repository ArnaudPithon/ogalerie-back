export type Artwork = {
  id: number;
  title: string;
  uri: string;
  date: string;
  description: string;
  mature?: boolean;
  collectionId: number;
  ownerId: number;
  type: string;
  support: string;
  style: string;
  createdAt: Date;
  updatedAt: Date;
}
