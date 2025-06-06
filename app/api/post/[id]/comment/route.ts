import { NextRequest, NextResponse } from "next/server";
import { updateComment, getById, deleteById, createComment } from "@/lib/prisma/comment";
import { Comment, CommentPayload } from "@/types/comment";



export async function PUT(request: NextRequest, {
    params: { id },
}: {
    params: { id: string }
}) {
    try {
        let commentData: Comment = await request.json()

        const result = await updateComment(Number(id), commentData)
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "Comentario editado",
                result: result.comment,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "Edición de Comentario fallida",
            result: result.error,
            errors: result.message,
            error_title: "Edición de Comentario fallida",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "Edición de Comentario fallida",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Edición de Comentario fallida",
        }, {
            status: 500,
        });
    }
}


export async function POST(request: NextRequest, {
    params: { id },
}: {
    params: { id: string }
}) {
    try {
        let commentData: Comment = await request.json()

        const result = await createComment(Number(id), commentData)
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "Comentario creado",
                result: result.comment,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "Creación de Comentario fallida",
            result: result.error,
            errors: result.message,
            error_title: "Creación de Comentario fallida",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message:"Creación de Comentario fallida",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Creación de Comentario fallida",
        }, {
            status: 500,
        });
    }
}


export async function DELETE(request: NextRequest, {
    params: { id },
}: {
    params: { id: string }
}) {
    try {

        const result = await deleteById(Number(id))
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "Comentario eliminado",
                result: result.comment,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "Eliminación de Comentario fallida",
            result: result.error,
            errors: result.message,
            error_title: "Eliminación de Comentario fallida",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message:"Eliminación de Comentario fallida",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Eliminación de Comentario fallida",
        }, {
            status: 500,
        });
    }
}







