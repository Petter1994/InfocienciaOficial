import { Comment, CommentPayload } from "@/types/comment";
import { PrismaClient, Prisma } from '@prisma/client'


const prisma = new PrismaClient()

export async function getAll() {
    try {
        const commentFromDb = await prisma.comment.findMany()
        if (!commentFromDb) {
            return { error: { code: 404 }, message: "not found", ok: false }
        }
        return { comments: commentFromDb, ok: true }
    } catch (error: any) {
        return { error, message: error.message, ok: false }
    }
}


export async function createComment(postID: number, comment: CommentPayload) {
    try {
        const commentData = {
            content: comment.content,
            postId: postID,
            authorId: comment.authorId
        };

        console.log('commentData DATA', commentData)

        const commentFromDb = await prisma.comment.create({ data: commentData });
        return { comment: commentFromDb, ok: true };

    } catch (error: any) {
        console.error("Error en createComment:", error);
        return {
            error: error.code || "UNKNOWN_ERROR",
            message: error.message,
            ok: false
        };
    }
}

export async function updateComment(id: number, comment: CommentPayload) {
    try {

        const updateData: Prisma.CommentUpdateInput = {
            content: comment.content.trim(),
        }

        const updatedComment = await prisma.comment.update({
            where: { id },
            data: updateData,
        })

        return { comment: updatedComment, ok: true }
    } catch (error: any) {
        return { error, message: error.message, ok: false }
    }
}


export async function getById(id: number) {
    try {

        const commentFromDb: Comment | null = await prisma.comment.findUnique(
            {
                where: { id }, include: {
                    author: true,
                }
            },
        )
        if (!commentFromDb) {
            return { error: { code: 404 }, message: "not found", ok: false }
        }

        return { comment: commentFromDb, ok: true }
    } catch (error: any) {
        return { error, message: error.message, ok: false }
    }
}



export async function deleteById(id: number) {
    try {
        const commentFromDb: Comment | null = await prisma.comment.delete(
            {
                where: { id },
            },
        )
        if (!commentFromDb) {
            return { error: { code: 404 }, message: "not found", ok: false }
        }
        return { comment: commentFromDb, ok: true }
    } catch (error: any) {
        return { error, message: error.message, ok: false }
    }
}

