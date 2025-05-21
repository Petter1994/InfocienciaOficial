import { NextRequest, NextResponse } from "next/server";
import { inactiveComment} from "@/lib/prisma/comment";


export async function POST(request: NextRequest, {
    params: { id },
}: {
    params: { id: string }
}) {
    try {

        const result = await inactiveComment(Number(id))
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "comment inactive",
                result: result.comment,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "comment inactive",
            result: result.error,
            errors: result.message,
            error_title: "comment inactive failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "comment inactive failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "comment inactive failed",
        }, {
            status: 500,
        });
    }
}




