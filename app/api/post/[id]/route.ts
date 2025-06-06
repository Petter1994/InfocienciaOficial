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
                status_message: "Artículo cargado",
                result: result.post,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message:"Carga de Artículo fallida",
            result: result.error,
            errors: result.message,
            error_title: "Carga de Artículo fallida",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "Carga de Artículo fallida",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Carga de Artículo fallida",
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
                status_message: "Artículo editado",
                result: result.post,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "Edición de Artículo fallida",
            result: result.error,
            errors: result.message,
            error_title: "Edición de Artículo fallida",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "Edición de Artículo fallida",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Edición de Artículo fallida",
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
                status_message: "Artículo borrado",
                result: result.post,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "Borrado de Artículo fallido",
            result: result.error,
            errors: result.message,
            error_title: "Borrado de Artículo fallido",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "Borrado de Artículo fallido",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Borrado de Artículo fallido",
        }, {
            status: 500,
        });
    }
}







