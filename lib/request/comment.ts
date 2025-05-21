import {CommentPayload} from '@/types/comment'
import {GenericResponse} from '@/types/response'
import { FetchError } from '@/types/error'


export const fetchAllCommentUrl = '/api/comment'

export const fetchAllComment = async (url: string) => {
    const result = await fetch(url);
    if (result.status === 401) {
        const error: FetchError = new Error('The user is unauthorized')
        // Attach extra info to the error object.
        error.info = "USER_ERROR"
        error.status = result.status.toString()
        throw error
    } else if (result.status !== 200) {
        const error: FetchError = new Error('The post could not be fetched')
        // Attach extra info to the error object.
        const resultJson: GenericResponse = await result.json()
        error.info = resultJson.status_message
        error.status = result.status.toString()
        throw error
    }
    return await result.json()
}



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



