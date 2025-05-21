import { NextRequest, NextResponse } from "next/server";
import { activeComment} from "@/lib/prisma/comment";



export async function POST(request: NextRequest, {
    params: { id },
}: {
    params: { id: string }
}) {
    try {

        const result = await activeComment(Number(id))
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "comment active",
                result: result.comment,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "comment active",
            result: result.error,
            errors: result.message,
            error_title: "comment active failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "comment active failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "comment active failed",
        }, {
            status: 500,
        });
    }
}







