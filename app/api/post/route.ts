import {NextRequest, NextResponse} from "next/server";
import {createPost, getAll} from "@/lib/prisma/post";
import {Post} from "@/types/post";
import { PostPayload } from "@/types/post";


export async function GET() {
    
    try {
       
        const result = await getAll();
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "Artículos cargados",
                result: result.post,
            }, {status: 200}
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "Carga de Artículos fallida",
            result: result.error,
            errors: result.message,
            error_title: "Carga de Artículos fallida",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "Carga de Artículos fallida",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Carga de Artículos fallida",
        }, {
            status: 500,
        });
    }
}



export async function POST(request: NextRequest) {
    try {
        let postData: PostPayload = await request.json()
        const result = await createPost(postData)
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "Artículo creado",
                result: result.post,
            }, {status: 200}
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "Creación de Artículo fallida",
            result: result.error,
            errors: result.message,
            error_title: "Creación de Artículo fallida",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "Creación de Artículo fallida",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Creación de Artículo fallida",
        }, {
            status: 500,
        });
    }
}