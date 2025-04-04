import { User } from '@/types/user'

export type Comment = {
    id: number,
    content: string,
    postId: number;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
    author: User
}

export type CommentPayload = {
    content: string,
    postId: number;
    authorId: number;
}
