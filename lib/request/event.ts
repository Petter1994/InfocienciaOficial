import { Event, EventPayload } from '@/types/event'
import { GenericResponse } from '@/types/response'
import { FetchError } from '@/types/error'

export const fetchAllEventUrl = '/api/event'

export const fetchAllEvent = async (url: string) => {
    const result = await fetch(url);
    if (result.status === 401) {
        const error: FetchError = new Error('The user is unauthorized')
        // Attach extra info to the error object.
        error.info = "USER_ERROR"
        error.status = result.status.toString()
        throw error
    } else if (result.status !== 200) {
        const error: FetchError = new Error('The event could not be fetched')
        // Attach extra info to the error object.
        const resultJson: GenericResponse = await result.json()
        error.info = resultJson.status_message
        error.status = result.status.toString()
        throw error
    }
    return await result.json()
}


export async function createEvent(payload: EventPayload) {
    console.log('REQUEST PAY', payload)
    if (payload) {
        const res: Response = await fetch(`/api/event`, {
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




export async function editEvent(payload: EventPayload, id: number) {
    console.log('REQUEST PAY', payload)
    if (payload) {
        const res: Response = await fetch(`/api/event/${id}`, {
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



export async function deleteEvent(id: number) {
    const res: Response = await fetch(`/api/event/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const response: GenericResponse = await res.json();
    return response
}



