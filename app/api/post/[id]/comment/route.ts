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
                status_message: "comment edited",
                result: result.comment,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "comment edit failed",
            result: result.error,
            errors: result.message,
            error_title: "comment edit failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "comment edit failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "comment edit failed",
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
                status_message: "comment created",
                result: result.comment,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "comment create failed",
            result: result.error,
            errors: result.message,
            error_title: "comment create failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "comment create failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "comment create failed",
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
                status_message: "comment deleted",
                result: result.comment,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "comment deleted failed",
            result: result.error,
            errors: result.message,
            error_title: "comment deleted failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "comment deleted failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "comment deleted failed",
        }, {
            status: 500,
        });
    }
}







