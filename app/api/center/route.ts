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
                status_message: "centers fetched",
                result: result.center,
            }, {status: 200}
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "centers fetching failed",
            result: result.error,
            errors: result.message,
            error_title: "centers fetching failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "centers fetching failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "centers fetching failed",
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
                status_message: "center created",
                result: result.center,
            }, {status: 200}
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "center creation failed",
            result: result.error,
            errors: result.message,
            error_title: "center creation failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "center creation failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "center creation failed",
        }, {
            status: 500,
        });
    }
}