import { User, UserData } from '@/types/user'
import { GenericResponse } from '@/types/response'
import { FetchError } from '@/types/error'





export async function editUser(payload: UserData, id: number) {
    console.log('REQUEST PAY', payload)
    if (payload) {
        const res: Response = await fetch(`/api/user/${id}`, {
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


