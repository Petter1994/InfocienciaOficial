'use client'
import {useState, ChangeEvent} from 'react'
import {useSnackbar} from 'notistack';
import {GenericResponse} from '@/types/response'
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {CommentPayload} from "@/types/comment";
import {createComment} from "@/lib/request/comment";

import {
    TextField,
    TextareaAutosize,
    Button,
} from '@mui/material';


type FormData = {
    name: string;
    email: string;
    content: string;
}

type FormErrors = {
    name?: string
    email?: string
    content?: string
}

const emptyFormError: FormErrors = {
    name: '',
    email: '',
    content: '',
}

const emptyFormData: FormData = {
    name: '',
    email: '',
    content: '',
}

type Props = {
    mutate?: () => Promise<any>
    onClose?: () => void
    postId: number
}


export default function AddCommentForm(props: Props) {
    const {enqueueSnackbar} = useSnackbar()

    const [errors, setErrors] = useState<FormErrors>(emptyFormError)
    const [formData, setFormData] = useState<FormData>(emptyFormData);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const cleanForm = () => {
        setErrors(emptyFormError)
    }

    const validateForm = () => {
        const newErrors: FormErrors = {};


        if (formData.name === "") {
            newErrors.name = 'Nombre requerido';
        }

        if (formData.email === "") {
            newErrors.email = 'Correo requerido';
        }
        if (formData.content === "") {
            newErrors.content = 'Comentario requerido';
        }

        if (Object.keys(newErrors).length === 0) {
            return true
        } else {
            setErrors(newErrors);
            return false
        }
    }

    const cleanErrors = () => {
        setErrors(emptyFormError)
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        if (validateForm()) {
            const payload: CommentPayload = {
                name: formData.name,
                postId: props.postId,
                email: formData.email,
                content: formData.content,
            }

            console.log('Payload FRONT', payload);
            //@ts-ignore
            const res: GenericResponse = await createComment(payload , props.postId)

            console.log('RES FRONT', res)

            if (res.status_name === 'error') {
                enqueueSnackbar(res.error_title, {variant: 'error'})

            } else {
                enqueueSnackbar(res.status_message, {variant: 'success'});
                props.mutate && await props.mutate()
                props.onClose && props.onClose()
            }
            setIsLoading(false)
        }

        setIsLoading(false)
    };




    return (
        <>
            <form noValidate onSubmit={handleSubmit}>
                <div className="w-full grid cols-1 gap-4 mt-5 min-w-[800px]">
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Nombre"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                        error={errors.name !== ""}
                        helperText={errors.name}
                        onFocus={cleanErrors}
                    />

                    <TextField
                        required
                        type='email'
                        id="email"
                        name="email"
                        label="Correo"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                        error={errors.email !== ""}
                        helperText={errors.email}
                        onFocus={cleanErrors}
                    />

                    <p>Comentario:</p>
                    <TextareaAutosize
                        required
                        aria-label="Comentario"
                        minRows={10}
                        placeholder="Escriba su comentario aqui"
                        id='content'
                        name='content'
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(event)}
                        onFocus={cleanErrors}
                        style={{border: 'solid 2px', padding: 5}}
                    />
                </div>

                <div className='flex justify-center align-middle text-center gap-5 mt-5'>
                    <Button variant="contained" endIcon={<CancelIcon/>} onClick={props.onClose} color='error' disabled={isLoading}>
                        Cancelar
                    </Button>

                    <Button variant="contained" endIcon={<AddCircleIcon/>} onClick={handleSubmit} disabled={isLoading}>
                        Crear
                    </Button>
                </div>
            </form>
        </>
    )
}