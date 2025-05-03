import {NextRequest, NextResponse} from "next/server";
import {createEvent, getAll} from "@/lib/prisma/event";
import {Event} from "@/types/event";



export async function GET() {
    
    try {
       
        const result = await getAll();
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "events fetched",
                result: result.event,
            }, {status: 200}
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "events fetching failed",
            result: result.error,
            errors: result.message,
            error_title: "events fetching failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "events fetching failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "events fetching failed",
        }, {
            status: 500,
        });
    }
}



export async function POST(request: NextRequest) {
    try {
        let eventData: Event = await request.json()
      
        const result = await createEvent(eventData)
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "event created",
                result: result.event,
            }, {status: 200}
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "event creation failed",
            result: result.error,
            errors: result.message,
            error_title: "event creation failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "event creation failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "event creation failed",
        }, {
            status: 500,
        });
    }
}