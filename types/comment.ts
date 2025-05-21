export type Comment = {
    id: number,
    content: string,
    name: string,
    email: string,
    postId: number;
    createdAt: Date;
    updatedAt: Date;
    status: 'ACTIVE' | 'INACTIVE';
}

export type CommentPayload = {
    content: string,
    postId: number;
    name: string,
    email: string,
}

export const emptyComment : Comment = {
    id: 99999999,
    content: '',
    name: '',
    email: '',
    postId: 999999,
    createdAt: new Date,
    updatedAt: new Date,
    status:'INACTIVE'
}
