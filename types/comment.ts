export type Comment = {
    id: number,
    content: string,
    name: string,
    email: string,
    postId: number;
    createdAt: Date;
    updatedAt: Date;
}

export type CommentPayload = {
    content: string,
    postId: number;
    name: string,
    email: string,
}
