import { Comment, CommentPayload } from '@/types/comment'
import { GenericResponse } from '@/types/response'
import { FetchError } from '@/types/error'




export async function createComment(payload: CommentPayload, id: number) {
    if (payload) {
        const res: Response = await fetch(`/api/post/${id}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const response: GenericResponse = await res.json();
        return response
    }
}


export async function editComment(payload: CommentPayload, id: number) {
    if (payload) {
        const res: Response = await fetch(`/api/post/${id}/comment`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        const response: GenericResponse = await res.json();
        return response
    }
}



export async function deleteComment(id: number) {
    const res: Response = await fetch(`/api/post/${id}/comment`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const response: GenericResponse = await res.json();
    return response
}



