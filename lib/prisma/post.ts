import {Post, PostPayload} from "@/types/post";
import {PrismaClient, Prisma} from '@prisma/client'


const prisma = new PrismaClient()

export async function getAll() {
    try {
        const postFromDb = await prisma.post.findMany()
        if (!postFromDb) {
            return {error: {code: 404}, message: "not found", ok: false}
        }
        return {post: postFromDb, ok: true}
    } catch (error: any) {
        return {error, message: error.message, ok: false}
    }
}

function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export async function createPost(post: PostPayload) {
    try {
        // 1. Validar centerId
        const centerExists = await prisma.center.findUnique({
            where: {id: post.center}
        });
        if (!centerExists) {
            throw new Error(`Center con ID ${post.center} no existe`);
        }

        // 2. Preparar datos (excluyendo posibles IDs manuales)
        const postData = {
            title: post.title,
            content: post.body || null, // Asegura null si es undefined
            thumbnail: post.coverImage,
            tags: post.tags || null,
            centerId: post.center,
            author: post.author || null,
            text: post.body || "",
            html: "",
            description: post.description || null,
            url: post.url || null
        };

        console.log('POST DATA', postData)

        // 3. Crear post
        const postFromDb = await prisma.post.create({data: postData});
        return {post: postFromDb, ok: true};

    } catch (error: any) {
        console.error("Error en createPost:", error);
        return {
            error: error.code || "UNKNOWN_ERROR",
            message: error.message,
            ok: false
        };
    }
}

export async function updatePost(id: number, post: PostPayload) {
    try {

        const updateData: Prisma.PostUpdateInput = {
            title: post.title.trim(),
            content: post.body?.trim() || null,
            thumbnail: post.coverImage?.trim() || null,
            tags: post.tags?.trim() || null,
        }

        const updatedPost = await prisma.post.update({
            where: {id},
            data: updateData,
            include: {
                center: true,
                comments: true
            }
        })

        return {post: updatedPost, ok: true}
    } catch (error: any) {
        return {error, message: error.message, ok: false}
    }
}


export async function getById(id: number) {
    try {
        const postFromDb = await prisma.post.findUnique({
            where: {id},
            include: {
                comments: {
                    include: {
                        author: true  // Incluye el objeto User completo
                    }
                },
                center: true
            }
        });

        if (!postFromDb) {
            return {error: {code: 404}, message: "not found", ok: false};
        }

        return {post: postFromDb, ok: true};
    } catch (error: any) {
        return {error, message: error.message, ok: false};
    }
}


export async function deleteById(id: number) {
    try {
        const postFromDb: Post | null = await prisma.post.delete(
            {
                where: {id},
            },
        )
        if (!postFromDb) {
            return {error: {code: 404}, message: "not found", ok: false}
        }
        return {post: postFromDb, ok: true}
    } catch (error: any) {
        return {error, message: error.message, ok: false}
    }
}


export async function updateImgPost(id: number, imgUrl: String) {
    try {
        // @ts-ignore
        const postFromDb = await prisma.post.update({
            where: {
                id: id,
            },
            // @ts-ignore
            data: {coverUrl: imgUrl},
        })
        return {book: postFromDb, ok: true}
    } catch (error: any) {
        return {error, message: error.message, ok: false}
    }
}
