import {NextRequest, NextResponse} from "next/server";
import {createCenter, getAll} from "@/lib/prisma/center";
import {Center} from "@/types/center";



export async function GET() {
    
    try {
       
        const result = await getAll();
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "Centros cargados",
                result: result.center,
            }, {status: 200}
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "Carga de Centros fallida",
            result: result.error,
            errors: result.message,
            error_title: "Carga de Centros fallida",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "Carga de Centros fallida",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Carga de Centros fallida",
        }, {
            status: 500,
        });
    }
}



export async function POST(request: NextRequest) {
    try {
        let centerData: Center = await request.json()
      
        const result = await createCenter(centerData)
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "Centro creado",
                result: result.center,
            }, {status: 200}
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "Creación de Centro fallida",
            result: result.error,
            errors: result.message,
            error_title: "Creación de Centro fallida",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "Creación de Centro fallida",
            result: `${e}`,
            errors: `${e}`,
            error_title: "Creación de Centro fallida",
        }, {
            status: 500,
        });
    }
}