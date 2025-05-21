'use client'
import Image from 'next/image'
import {useState, ChangeEvent} from 'react'
import {useSnackbar} from 'notistack';
import {Post, PostPayload} from '@/types/post'
import {GenericResponse} from '@/types/response'
import {editPost} from '@/lib/request/post'

import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import {Center} from '@/types/center'
import FullDrop from "@/components/DropZone/FullDrop"
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

type FormData = {
    title: string
    body: string
    authors: string
    coverImage: string | undefined
    tags: string,
    description: string | null
    url: string | null
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
    console.log('Post', post)
    const {enqueueSnackbar} = useSnackbar()

    const currentPost: FormData = {
        title: post.title,
        body: post.body,
        authors: post.author,
        coverImage: post.coverImage,
        tags: post.tags,
        url: post.url ? post.url : "",
        description: post.description ? post.description : ""

    }

    const [errors, setErrors] = useState<FormErrors>(emptyFormError)
    const [formData, setFormData] = useState<FormData>(currentPost);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedCenter, setSelectedCenter] = useState<string>("")
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [file, setFile] = useState(null)


    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }


    const handleChangeCenter = (event: SelectChangeEvent) => {
        const {value} = event.target;
        setSelectedCenter(value)
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


    const handleFileUpload = async (file: any) => {
        if (!file) return;

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'infociencia');

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/dxv5i7vir/image/upload`,
                {method: 'POST', body: formData}
            );

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            setUploadedUrl(data.secure_url);
            return data.secure_url; // Devuelve la URL para el componente hijo
        } catch (error) {
            console.error('Error:', error);
            throw error; // Propaga el error para que el hijo lo maneje
        } finally {
            setIsUploading(false);
        }
    };


    const handleSubmit = async () => {

        setIsLoading(true)

        if (validateForm()) {
            const payload: PostPayload = {
                title: formData.title,
                body: formData.body,
                author: formData.authors,
                date: new Date,
                tags: formData.tags,
                center: Number(selectedCenter),
                coverImage: uploadedUrl !== "" ? uploadedUrl : formData.coverImage,
                description: formData.description ? formData.description : '',
                url: formData.url ? formData.url : ''
            }

            console.log('Payload FRONT', payload);

            //@ts-ignore
            const res: GenericResponse = await editPost(payload, post.id)

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
                <div className="shape shape-left ">
                    <img src="/images/shape/shape-7a.svg" alt=""/>
                </div>
                <div className="shape shape-right">
                    <img src="/images/shape/shape-2a.svg" alt=""/>
                </div>
                <div className="w-full grid cols-1 gap-4 mt-5 min-w-[800px]">
                    <TextField
                        required
                        id="title"
                        name="title"
                        label="Titulo"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
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
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
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


                    <div className='flex gap-5'>

                        {/* Resultado */}
                        {uploadedUrl || post.thumbnail && (
                            <div className=''>
                                <h4>Imagen subida:</h4>
                                <img
                                    src={uploadedUrl ? uploadedUrl : post.thumbnail}
                                    alt="Preview"
                                    style={{maxWidth: '300px', border: '1px solid #ddd'}}
                                />
                                <div className='mt-4'>
                                    <a href={uploadedUrl} target="_blank" rel="noopener">
                                        <Button
                                            fullWidth
                                            variant="contained"


                                            startIcon={<RemoveRedEyeOutlinedIcon/>}
                                        >
                                            Ver imagen completa
                                        </Button>

                                    </a>
                                </div>
                            </div>
                        )}

                        <FullDrop
                            onUpload={handleFileUpload}
                            isUploading={isUploading}
                        />

                    </div>

                    <p>Descripción:</p>
                    <TextareaAutosize
                        aria-label="Descripcion del Articulo"
                        minRows={10}
                        placeholder="Escriba una breve descripción de su articulo"
                        id='description'
                        name='description'
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(event)}
                        defaultValue={formData.description ? formData.description : ""}
                        onFocus={cleanErrors}
                        style={{border: 'solid 2px', padding: 5}}
                    />


                    <TextField
                        id="url"
                        name="url"
                        label="Url de su Articulo"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                        onFocus={cleanErrors}
                    />


                    <TextField
                        required
                        id="tags"
                        name="tags"
                        label="Etiqueta"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                        defaultValue={formData.tags}
                        onFocus={cleanErrors}

                    />


                </div>

                <div className='flex justify-center align-middle text-center gap-5 mt-5'>
                    <Button variant="contained" endIcon={<CancelIcon/>} onClick={props.onClose} color='error'
                            disabled={isLoading}>
                        Cancelar
                    </Button>

                    <Button variant="contained" endIcon={<AddCircleIcon/>} onClick={handleSubmit} disabled={isLoading}>
                        Aceptar
                    </Button>

                </div>
            </form>
        </>
    )
}