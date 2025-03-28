import { Post, PostPayload } from '@/types/post'
import { GenericResponse } from '@/types/response'
import { FetchError } from '@/types/error'



export const fetchAllPostUrl = '/api/post'

export const fetchAllPost = async (url: string) => {
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


export const getFetchPostDetailsUrl = (postId: string) => {
    return `/api/post/${postId}`
}

export const fetchPostDetails = async (url: string) => {
    const result = await fetch(url);
    if (result.status === 401) {
        const error: FetchError = new Error('The user is unauthorized')
        // Attach extra info to the error object.
        error.info = "USER_ERROR"
        error.status = result.status.toString()
        throw error
    } else if (result.status !== 200) {
        const error: FetchError = new Error('The books could not be fetched')
        // Attach extra info to the error object.
        const resultJson: GenericResponse = await result.json()
        error.info = resultJson.status_message
        error.status = result.status.toString()
        throw error
    }
    return await result.json()
}



export async function getPostById(id: string) {
    const res: Response = await fetch(`/api/post/${id}`);
    const response: GenericResponse = await res.json();
    return response

}



export async function createPost(payload: PostPayload) {
    if (payload) {
        const res: Response = await fetch(`/api/post`, {
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


export async function editPost(payload: PostPayload, id: number) {
    console.log('REQUEST PAY', payload)
    if (payload) {
        const res: Response = await fetch(`/api/post/${id}`, {
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



export async function deletePost(id: number) {
    const res: Response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const response: GenericResponse = await res.json();
    return response
}



