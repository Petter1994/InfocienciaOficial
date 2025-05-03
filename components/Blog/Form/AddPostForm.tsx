'use client'
import {useState, ChangeEvent} from 'react'
import {useSnackbar} from 'notistack';
import {PostPayload} from '@/types/post'
import {GenericResponse} from '@/types/response'
import {createPost} from '@/lib/request/post'

import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import {
    TextField,
    TextareaAutosize,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    FormHelperText,
    Select
} from '@mui/material';
import {SelectChangeEvent} from '@mui/material/Select';
import {Center} from '@/types/center'
import FullDrop from "@/components/DropZone/FullDrop"

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';


type FormData = {
    title: string
    body: string
    authors: string
    coverImage: string | null
    tags: string
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
    center: ''
}

const emptyFormData: FormData = {
    title: '',
    body: '',
    authors: '',
    coverImage: null,
    tags: '',
    description: '',
    url: ''
}

type Props = {
    mutate?: () => Promise<any>
    onClose?: () => void
    centers: Center[]
}


export default function AddPostForm(props: Props) {
    const {enqueueSnackbar} = useSnackbar()
    const defaultImg = '/images/blog/blog-01.png'

    const [errors, setErrors] = useState<FormErrors>(emptyFormError)
    const [formData, setFormData] = useState<FormData>(emptyFormData);

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedCenter, setSelectedCenter] = useState<string>("")

    const [isDisable, setIsDisable] = useState(true)

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


    const handleFileUpload = async (file) => {
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


    const handleChangeCenter = (event: SelectChangeEvent) => {
        const {value} = event.target;
        setSelectedCenter(value)
    }


    const validateForm = () => {
        const newErrors: FormErrors = {};


        if (formData.title === "") {
            newErrors.title = 'Titulo requerido';
        }

        if (selectedCenter === "") {
            newErrors.center = 'Centro requerido';
        }


        if (formData.authors === "") {
            newErrors.authors = 'Autor requerido';
        }

        if (formData.body === "") {
            newErrors.body = 'Cuerpo requerido';
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
                body: '',
                author: formData.authors,
                date: new Date,
                tags: formData.tags,
                center: Number(selectedCenter),
                coverImage: uploadedUrl,
                description: formData.description ? formData.description : '',
                url: formData.url ? formData.url : ''
            }

            console.log('Payload FRONT', payload);
            const res: GenericResponse = await createPost(payload)

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
                <div className=" grid cols-1 gap-4 mt-5 w-[800]">


                    <TextField
                        required
                        id="title"
                        name="title"
                        label="Titulo"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
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
                        <FullDrop
                            onUpload={handleFileUpload}
                            isUploading={isUploading}
                        />

                        {/* Resultado */}
                        {uploadedUrl && (
                            <div className=''>
                                <h4>Imagen subida:</h4>
                                <img
                                    src={uploadedUrl}
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
                    </div>

                    <TextareaAutosize
                        required
                        aria-label="Descripcion del Articulo"
                        minRows={10}
                        placeholder="Escriba una breve descripción de su articulo"
                        id='description'
                        name='description'
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange(event)}
                        onFocus={cleanErrors}
                    />

                    <TextField
                        id="url"
                        name="url"
                        label="Url de su Articulo"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                        onFocus={cleanErrors}
                    />

                    <TextField
                        id="tags"
                        name="tags"
                        label="Etiqueta"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                        onFocus={cleanErrors}
                    />


                </div>

                <div className='flex justify-center align-middle text-center gap-5 mt-5'>
                    <Button variant="contained" endIcon={<CancelIcon/>} onClick={props.onClose} color='error'>
                        Cancelar
                    </Button>

                    <Button variant="contained" endIcon={<AddCircleIcon/>} onClick={handleSubmit}>
                        Crear
                    </Button>


                </div>
            </form>
        </>
    )
}