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
                status_message: "Eventos cargados",
                result: result.event,
            }, {status: 200}
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "Carga de Eventos fallida",
            result: result.error,
            errors: result.message,
            error_title:"Carga de Eventos fallida",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "Carga de Eventos fallida",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Carga de Eventos fallida",
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
                status_message: "Evento creado",
                result: result.event,
            }, {status: 200}
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "Creación de Evento fallida",
            result: result.error,
            errors: result.message,
            error_title: "Creación de Evento fallida",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "Creación de Evento fallida",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Creación de Evento fallida",
        }, {
            status: 500,
        });
    }
}