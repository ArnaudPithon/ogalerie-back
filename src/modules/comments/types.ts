type Comment = {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
export type UserComment = {
  get_user_comments: {
    comment: Comment;
    artworkUri: string;
    artworkTitle: string;
    collectionId: number;
  }
}
