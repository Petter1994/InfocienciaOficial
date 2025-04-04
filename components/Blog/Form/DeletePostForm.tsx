'use client'
import { useState, ChangeEvent } from 'react'
import { useSnackbar } from 'notistack';
import { Post } from '@/types/post'
import { GenericResponse } from '@/types/response'
import { deletePost } from '@/lib/request/post'

import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



type Props = {
    mutate?: () => Promise<any>
    onClose?: () => void
    post: Post
}



export default function DeletePostForm(props: Props) {
    const post = props.post
    const { enqueueSnackbar } = useSnackbar()

    
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async () => {
        setIsLoading(true)


        const res: GenericResponse = await deletePost(post.id)

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