import {NextResponse} from "next/server";
import {getAll} from "@/lib/prisma/comment";



export async function GET() {
    
    try {
       
        const result = await getAll();
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "comments fetched",
                result: result.comments,
            }, {status: 200}
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "comments fetching failed",
            result: result.error,
            errors: result.message,
            error_title: "comments fetching failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "comments fetching failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "comments fetching failed",
        }, {
            status: 500,
        });
    }
}

