'use client'
import { useState, ChangeEvent } from 'react'
import { useSnackbar } from 'notistack';
import { Post, PostPayload } from '@/types/post'
import { GenericResponse } from '@/types/response'
import { editPost } from '@/lib/request/post'

import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { Center } from '@/types/center'


type FormData = {
    title: string
    body: string
    authors: string
    coverImage: string | undefined
    tags: string
}

type FormErrors = {
    title?: string
    body?: string
    authors?: string
    center?: string
}

const emptyFormError: FormErrors = {
    title: '',
    body: '',
    authors: '',
}


type Props = {
    mutate?: () => Promise<any>
    onClose?: () => void
    post: Post
    centers: Center[]
}



export default function EditPostForm(props: Props) {
    const post = props.post
    const { enqueueSnackbar } = useSnackbar()

    const currentPost: FormData = {
        title: post.title,
        body: post.body,
        authors: post.author,
        coverImage: post.coverImage,
        tags: post.tags
    }

    const [errors, setErrors] = useState<FormErrors>(emptyFormError)
    const [formData, setFormData] = useState<FormData>(currentPost);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedCenter, setSelectedCenter] = useState<string>("")
    const [chips, setChips] = useState<string[]>([])



    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }


    const handleTagsChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        if (value !== "") {
            const array = chips.concat([value])
            setChips(array)
        }
    }

    const handleChangeCenter = (event: SelectChangeEvent) => {
        const { value } = event.target;
        setSelectedCenter(value)
    }




    const cleanForm = () => {
        setErrors(emptyFormError)
    }

    const validateForm = () => {
        const newErrors: FormErrors = {};


        if (formData.title === "") {
            newErrors.title = 'Titulo requerido';
        }

        if (formData.body === "") {
            newErrors.body = 'Cuerpo requerido';
        }

        if (selectedCenter === "") {
            newErrors.center = 'Centro requerido';
        }


        if (formData.authors.length === 0) {
            newErrors.authors = 'Autor requerido';
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
            const payload: PostPayload = {
                title: formData.title,
                body: formData.body,
                author: formData.authors,
                date: new Date,
                tags: formData.tags,
                center: Number(selectedCenter)
            }

            console.log('Payload FRONT', payload);
            const res: GenericResponse = await editPost(payload, post.id)

            console.log('RES FRONT', res)

            if (res.status_name === 'error') {
                enqueueSnackbar(res.error_title, { variant: 'error' })

            } else {
                enqueueSnackbar(res.status_message, { variant: 'success' });
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
                <div className="w-full grid cols-1 gap-4 mt-5">
                    <TextField
                        required
                        id="title"
                        name="title"
                        label="Titulo"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                        defaultValue={formData.title}
                        error={errors.title !== ""}
                        helperText={errors.title}
                        onFocus={cleanErrors}
                    />

                    <TextField
                        required
                        id="authors"
                        name="authors"
                        label="Autores"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                        defaultValue={formData.authors}
                        error={errors.authors !== ""}
                        helperText={errors.authors}
                        onFocus={cleanErrors}
                    />

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Centro</InputLabel>
                        <Select
                            labelId="center"
                            id="center"
                            value={selectedCenter}
                            label="Centro"
                            onChange={handleChangeCenter}
                            error={errors.center !== ""}
                            onFocus={cleanErrors}
                        >

                            {
                                props.centers.map((center, key) => (
                                    <MenuItem key={key} value={center.id}>{center.name}</MenuItem>
                                ))
                            }
                        </Select>
                        <FormHelperText>{errors.center}</FormHelperText>
                    </FormControl>


                    <TextareaAutosize
                        aria-label="Cuerpo del Articulo"
                        minRows={10}
                        placeholder="Escriba su articulo aqui"
                        id='body'
                        name='body'
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange(event)}
                        defaultValue={formData.body}
                        onFocus={cleanErrors}
                    />


                    <TextField
                        required
                        id="tags"
                        name="tags"
                        label="Etiqueta"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                        defaultValue={formData.tags}
                        onFocus={cleanErrors}

                    />


                </div>

                <div className='flex justify-center align-middle text-center gap-5 mt-5'>
                    <Button variant="contained" endIcon={<CancelIcon />} onClick={props.onClose} color='error'>
                        Cancelar
                    </Button>

                    <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleSubmit}>
                        Aceptar
                    </Button>

                </div>
            </form>
        </>
    )
}