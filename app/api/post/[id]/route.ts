import { NextRequest, NextResponse } from "next/server";
import { updatePost, getById, deleteById } from "@/lib/prisma/post";
import { Post } from "@/types/post";


export async function GET(request, { params }) {
    try {
        const { id } = await params;
 
        const result = await getById(Number(id))

        console.log('RES', result)
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "post fetch",
                result: result.post,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "post fetch failed",
            result: result.error,
            errors: result.message,
            error_title: "post fetch failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "post fetch failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "post fetch failed",
        }, {
            status: 500,
        });
    }
   
}



export async function PUT(request: NextRequest, {
    params: { id },
}: {
    params: { id: string }
}) {
    try {
        let postData: Post = await request.json()

        const result = await updatePost(Number(id), postData)
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "post edited",
                result: result.post,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "post edit failed",
            result: result.error,
            errors: result.message,
            error_title: "post edit failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "post edit failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "post edit failed",
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
                status_message: "post deleted",
                result: result.post,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "post deleted failed",
            result: result.error,
            errors: result.message,
            error_title: "post deleted failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "post deleted failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "post deleted failed",
        }, {
            status: 500,
        });
    }
}







