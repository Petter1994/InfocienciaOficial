'use client'
import { useState, ChangeEvent } from 'react'
import { useSnackbar } from 'notistack';
import { Center } from '@/types/center'
import { GenericResponse } from '@/types/response'
import { deleteCenter } from '@/lib/request/center'

import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



type Props = {
    mutate?: () => Promise<any>
    onClose?: () => void
    center: Center
}



export default function DeleteCenterForm(props: Props) {
    const center = props.center
    const { enqueueSnackbar } = useSnackbar()

    const [deleteString, setDeleteString] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)





    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { value } = event.target;
        setDeleteString(value)
    }

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
                <div className="w-full grid cols-1 gap-4 mt-5">
                    <TextField
                        required
                        id="title"
                        name="title"
                        label="Titulo"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                        error={deleteString !== "" && deleteString !== 'DELETE'}
                        helperText="Por Favor Escriba DELETE"
                    />
                </div>

                <div className='flex justify-center align-middle text-center gap-5 mt-5'>
                    <Button variant="contained" endIcon={<CancelIcon />} onClick={props.onClose} color='error'>
                        Cancelar
                    </Button>

                    <Button
                        disabled={deleteString !== "DELETE"}
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