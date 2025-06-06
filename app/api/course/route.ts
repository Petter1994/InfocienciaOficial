import {NextRequest, NextResponse} from "next/server";
import {createCourse, getAll} from "@/lib/prisma/course";
import {Course} from "@/types/course";



export async function GET() {
    
    try {
       
        const result = await getAll();
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "Cursos cargados",
                result: result.event,
            }, {status: 200}
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "Carga de Curso fallida",
            result: result.error,
            errors: result.message,
            error_title: "Carga de Curso fallida",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "Carga de Curso fallida",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Carga de Curso fallida",
        }, {
            status: 500,
        });
    }
}



export async function POST(request: NextRequest) {
    try {
        let courseData: Event = await request.json()
      
        const result = await createCourse(courseData)
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "Curso creado",
                result: result.course,
            }, {status: 200}
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "Creacion de Curso fallida",
            result: result.error,
            errors: result.message,
            error_title: "Creacion de Curso fallida",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message:"Creacion de Curso fallida",
            result: `${e}`,
            errors: `${e}`,
            error_title:"Creacion de Curso fallida",
        }, {
            status: 500,
        });
    }
}