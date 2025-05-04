'use client'
import { useState } from 'react'
import { useSnackbar } from 'notistack';
import { Center } from '@/types/center'
import { GenericResponse } from '@/types/response'
import { deleteCenter } from '@/lib/request/center'

import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'



type Props = {
    mutate?: () => Promise<any>
    onClose?: () => void
    center: Center
}



export default function DeleteCenterForm(props: Props) {
    const center = props.center
    const { enqueueSnackbar } = useSnackbar()

    const [isLoading, setIsLoading] = useState<boolean>(false)



    const handleSubmit = async () => {
        setIsLoading(true)


        const res: GenericResponse = await deleteCenter(center.id)

        console.log('RES FRONT', res)

        if (res.status_name === 'error') {
            enqueueSnackbar(res.error_title, { variant: 'error' })

        } else {
            enqueueSnackbar(res.status_message, { variant: 'success' });
            props.mutate && await props.mutate()
            props.onClose && props.onClose()
        }
        setIsLoading(false)


        setIsLoading(false)
    };





    return (
        <>
            <form noValidate onSubmit={handleSubmit}>

                <div className='flex justify-center align-middle text-center gap-5 mt-5'>
                    <Button variant="contained" endIcon={<CancelIcon />} onClick={props.onClose} color='error'>
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        endIcon={<DeleteForeverIcon />}
                        onClick={handleSubmit}
                    >
                        Eliminar
                    </Button>

                </div>
            </form>
        </>
    )
}