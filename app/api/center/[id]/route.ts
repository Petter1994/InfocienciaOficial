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
                status_message: "Centro cargado",
                result: result.center,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "Carga de Centro fallida",
            result: result.error,
            errors: result.message,
            error_title: "Carga de Centro fallida",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "Carga de Centro fallida",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Carga de Centro fallida",
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
                status_message: "Centro editado",
                result: result.center,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "Edición de Centro fallida",
            result: result.error,
            errors: result.message,
            error_title: "Edición de Centro fallida",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "Edición de Centro fallida",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Edición de Centro fallida",
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
                status_message: "Centro borrado",
                result: result.center,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "Borrado de Centro fallido",
            result: result.error,
            errors: result.message,
            error_title: "Borrado de Centro fallido",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "Borrado de Centro fallido",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Borrado de Centro fallido",
        }, {
            status: 500,
        });
    }
}







