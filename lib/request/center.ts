import { Center, CenterPayload } from '@/types/center'
import { GenericResponse } from '@/types/response'
import { FetchError } from '@/types/error'

export const fetchAllCenterUrl = '/api/center'

export const fetchAllCenter = async (url: string) => {
    const result = await fetch(url);
    if (result.status === 401) {
        const error: FetchError = new Error('The user is unauthorized')
        // Attach extra info to the error object.
        error.info = "USER_ERROR"
        error.status = result.status.toString()
        throw error
    } else if (result.status !== 200) {
        const error: FetchError = new Error('The center could not be fetched')
        // Attach extra info to the error object.
        const resultJson: GenericResponse = await result.json()
        error.info = resultJson.status_message
        error.status = result.status.toString()
        throw error
    }
    return await result.json()
}


export async function createCenter(payload: CenterPayload) {
    console.log('REQUEST PAY', payload)
    if (payload) {
        const res: Response = await fetch(`/api/center`, {
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




export async function editCenter(payload: CenterPayload, id: number) {
    console.log('REQUEST PAY', payload)
    if (payload) {
        const res: Response = await fetch(`/api/center/${id}`, {
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



export async function deleteCenter(id: number) {
    const res: Response = await fetch(`/api/center/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const response: GenericResponse = await res.json();
    return response
}



