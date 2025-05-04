import { NextRequest, NextResponse } from "next/server";
import { updateUserData } from "@/lib/prisma/user";
import { UserData } from "@/types/user";




export async function PUT(request: NextRequest, {
    params: { id },
}: {
    params: { id: string }
}) {
    try {
        let userData: UserData = await request.json()

        const result = await updateUserData( userData,Number(id),)
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "user edited",
                result: result.user,
            }, { status: 200 }
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "user edit failed",
            result: result.error,
            errors: result.message,
            error_title: "user edit failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "user edit failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "user edit failed",
        }, {
            status: 500,
        });
    }
}






