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
                status_message: "event fetched",
                result: result.event,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "event fetching failed",
            result: result.error,
            errors: result.message,
            error_title: "event fetching failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "event fetching failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "event fetching failed",
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
                status_message: "event edited",
                result: result.event,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "event edit failed",
            result: result.error,
            errors: result.message,
            error_title: "event edit failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "event edit failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "event edit failed",
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
                status_message: "event deleted",
                result: result.event,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "event deleted failed",
            result: result.error,
            errors: result.message,
            error_title: "event deleted failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "event deleted failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "event deleted failed",
        }, {
            status: 500,
        });
    }
}







