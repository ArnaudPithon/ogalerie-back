export type UpdateComment = {
  content: string;
  id: number;
}

export type NewComment = {
  content: string;
  artworkId: number;
}

export type Comment = {
  id: number;
  content: string;
  artworkUri: string;
  artworkTitle: string;
  collectionId: number;
}
export type UserComment = {
  get_user_comments: {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    artworkUri: string;
    artworkTitle: string;
    collectionId: number;
  }
}
