'use client'
import { useState } from 'react'
import { useSnackbar } from 'notistack';
import { Course } from '@/types/course'
import { GenericResponse } from '@/types/response'
import { deleteCourse } from '@/lib/request/course'

import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type Props = {
    mutate?: () => Promise<any>
    onClose?: () => void
    course: Course
}



export default function DeleteCourseForm(props: Props) {
    const course = props.course
    const { enqueueSnackbar } = useSnackbar()

    const [isLoading, setIsLoading] = useState<boolean>(false)



    const handleSubmit = async () => {
        setIsLoading(true)

        const res: GenericResponse = await deleteCourse(course.id)

        console.log('RES FRONT', res)

        if (res.status_name === 'error') {
            enqueueSnackbar(res.error_title, { variant: 'error' })

        } else {
            enqueueSnackbar(res.status_message, { variant: 'success' });
            props.mutate && await props.mutate()
            props.onClose && props.onClose()
        }
        setIsLoading(false)

    };





    return (
        <>
            <form noValidate onSubmit={handleSubmit}>

                <div className='flex justify-center align-middle text-center gap-5 mt-5'>
                    <Button variant="contained" endIcon={<CancelIcon />} onClick={props.onClose} color='error' disabled={isLoading}>
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        endIcon={<DeleteForeverIcon />}
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        Eliminar
                    </Button>

                </div>
            </form>
        </>
    )
}