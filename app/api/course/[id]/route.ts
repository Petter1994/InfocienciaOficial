import { NextRequest, NextResponse } from "next/server";
import { updateCourse, getById, deleteById } from "@/lib/prisma/course";
import { Course } from "@/types/course";



export async function GET(request: NextRequest, context: { params: { id: string } }) {

    try {
        const eventId = Number(context.params.id)
        const result = await getById(eventId);
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "Curso cargado",
                result: result.course,
            }, { status: 200 }
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



export async function PUT(request: NextRequest, {
    params: { id },
}: {
    params: { id: string }
}) {
    try {
        let courseData: Course = await request.json()

        const result = await updateCourse(Number(id), courseData)
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "course edited",
                result: result.course,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "course edit failed",
            result: result.error,
            errors: result.message,
            error_title: "course edit failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "course edit failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "course edit failed",
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
                status_message: "course deleted",
                result: result.course,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "course deleted failed",
            result: result.error,
            errors: result.message,
            error_title: "course deleted failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "course deleted failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "course deleted failed",
        }, {
            status: 500,
        });
    }
}







