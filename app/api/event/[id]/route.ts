import { NextRequest, NextResponse } from "next/server";
import { updateEvent, getById, deleteById } from "@/lib/prisma/event";
import { Event } from "@/types/event";



export async function GET(request: NextRequest, context: { params: { id: string } }) {

    try {
        const eventId = Number(context.params.id)
        const result = await getById(eventId);
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "Evento cargado",
                result: result.event,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "Carga de Evento fallida",
            result: result.error,
            errors: result.message,
            error_title: "Carga de Evento fallida",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "Carga de Evento fallida",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Carga de Evento fallida",
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
        let eventData: Event = await request.json()

        const result = await updateEvent(Number(id), eventData)
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "Evento editado",
                result: result.event,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "Edición de Evento fallida",
            result: result.error,
            errors: result.message,
            error_title: "Edición de Evento fallida",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "Edición de Evento fallida",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Edición de Evento fallida",
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
                status_message: "Evento borrado",
                result: result.event,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "Borrado de Evento fallido",
            result: result.error,
            errors: result.message,
            error_title: "Borrado de Evento fallido",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "Borrado de Evento fallido",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Borrado de Evento fallido",
        }, {
            status: 500,
        });
    }
}







