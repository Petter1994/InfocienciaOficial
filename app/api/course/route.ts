import {NextRequest, NextResponse} from "next/server";
import {createCourse, getAll} from "@/lib/prisma/course";
import {Course} from "@/types/course";



export async function GET() {
    
    try {
       
        const result = await getAll();
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "courses fetched",
                result: result.event,
            }, {status: 200}
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "courses fetching failed",
            result: result.error,
            errors: result.message,
            error_title: "courses fetching failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "courses fetching failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "courses fetching failed",
        }, {
            status: 500,
        });
    }
}



export async function POST(request: NextRequest) {
    try {
        let courseData: Event = await request.json()
      
        const result = await createCourse(courseData)
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "course created",
                result: result.course,
            }, {status: 200}
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "course creation failed",
            result: result.error,
            errors: result.message,
            error_title: "course creation failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "course creation failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "course creation failed",
        }, {
            status: 500,
        });
    }
}