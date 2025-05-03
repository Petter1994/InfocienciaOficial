import {NextRequest, NextResponse} from "next/server";
import {createPost, getAll} from "@/lib/prisma/post";
import {Post} from "@/types/post";
import { PostPayload } from "@/types/post";


export async function GET() {
    
    try {
       
        const result = await getAll();
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "posts fetched",
                result: result.post,
            }, {status: 200}
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "post fetching failed",
            result: result.error,
            errors: result.message,
            error_title: "post fetching failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "post fetching failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "post fetching failed",
        }, {
            status: 500,
        });
    }
}



export async function POST(request: NextRequest) {
    try {
        let postData: PostPayload = await request.json()
        const result = await createPost(postData)
        return result.ok ? NextResponse.json(
            {
                status_name: "success",
                status_code: 200,
                status_message: "post created",
                result: result.post,
            }, {status: 200}
        ) : NextResponse.json({
            status_name: "error",
            status_code: result.error.code,
            status_message: "post creation failed",
            result: result.error,
            errors: result.message,
            error_title: "post creation failed",
        }, {
            status: result.error.code == 404 ? 404 : 500
        });
    } catch (e) {
        return NextResponse.json({
            status_name: "error",
            status_code: 500,
            status_message: "post creation failed",
            result: `${e}`,
            errors: `${e}`,
            error_title: "post creation failed",
        }, {
            status: 500,
        });
    }
}