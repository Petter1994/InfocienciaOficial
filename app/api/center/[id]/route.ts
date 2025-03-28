import { NextRequest, NextResponse } from "next/server";
import { updateCenter, getById, deleteById } from "@/lib/prisma/center";
import { Center } from "@/types/center";



export async function GET(request: NextRequest, context: { params: { id: string } }) {

    try {
        const postId = Number(context.params.id)
        const result = await getById(postId);
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "center fetched",
                result: result.center,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "center fetching failed",
            result: result.error,
            errors: result.message,
            error_title: "center fetching failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "center fetching failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "center fetching failed",
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
        let centerData: Center = await request.json()

        const result = await updateCenter(Number(id), centerData)
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "center edited",
                result: result.center,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "center edit failed",
            result: result.error,
            errors: result.message,
            error_title: "center edit failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "center edit failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "center edit failed",
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
                status_message: "center deleted",
                result: result.center,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "center deleted failed",
            result: result.error,
            errors: result.message,
            error_title: "center deleted failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "center deleted failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "center deleted failed",
        }, {
            status: 500,
        });
    }
}







