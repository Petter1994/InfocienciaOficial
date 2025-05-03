'use client'
import { useState, FormEvent, ChangeEvent, useRef } from 'react'
import { useSnackbar } from 'notistack';
import { Center, CenterPayload, emptyCenter } from '@/types/center'
import { GenericResponse } from '@/types/response'
import { createPost } from '@/lib/request/post'

import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Centers } from '@/data/center'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { createCenter } from '@/lib/request/center';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import FullDrop from "@/components/DropZone/FullDrop"

type FormData = {
    name: string;
    area: string;
    grade: string;
    logo?: string
}

type FormErrors = {
    name?: string
    area?: string
    grade?: string
}

const emptyFormError: FormErrors = {
    name: '',
    area: '',
    grade: '',
}

const emptyFormData: FormData = {
    name: '',
    area: '',
    grade: '',
    logo: '',
}

type Props = {
    mutate?: () => Promise<any>
    onClose?: () => void
}



export default function AddCenterForm(props: Props) {
    const { enqueueSnackbar } = useSnackbar()

    const [errors, setErrors] = useState<FormErrors>(emptyFormError)
    const [formData, setFormData] = useState<FormData>(emptyFormData);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [chips, setChips] = useState<string[]>([])
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [file, setFile] = useState(null)



    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

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

        if (formData.area === "") {
            newErrors.area = 'Area requerida';
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
            const payload: CenterPayload = {
                name: formData.name,
                area: formData.area,
                grade: formData.grade,
                logo: uploadedUrl,
            }

            console.log('Payload FRONT', payload);
            const res: GenericResponse = await createCenter(payload)

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




    const handleFileUpload = async (file) => {
        if (!file) return;

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'infociencia');

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/dxv5i7vir/image/upload`,
                { method: 'POST', body: formData }
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






    return (
        <>
            <form noValidate onSubmit={handleSubmit}>
                <div className="w-full grid cols-1 gap-4 mt-5">
                    <div className='flex w-full mx-auto justify-center'>
                        <FullDrop
                            onUpload={handleFileUpload}
                            isUploading={isUploading}
            
                        />

                        {/* Resultado */}
                        {uploadedUrl && (
                            <div className='ml-5'>
                                <h4>Imagen subida:</h4>
                                <img
                                    src={uploadedUrl}
                                    alt="Preview"
                                    style={{ maxWidth: '300px', border: '1px solid #ddd' }}
                                />
                                <div className='mt-4'>
                                    <a href={uploadedUrl} target="_blank" rel="noopener">
                                        <Button
                                            fullWidth
                                            variant="contained"


                                            startIcon={<RemoveRedEyeOutlinedIcon />}
                                        >
                                            Ver imagen completa
                                        </Button>

                                    </a>
                                </div>
                            </div>
                        )}
                    </div>



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
                        id="area"
                        name="area"
                        label="Area"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                        error={errors.area !== ""}
                        helperText={errors.area}
                        onFocus={cleanErrors}
                    />


                    <TextField
                        required
                        id="grade"
                        name="grade"
                        label="Descripción"
                        multiline
                        rows={5}
                        onFocus={cleanErrors}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                    />

                </div>

                <div className='flex justify-center align-middle text-center gap-5 mt-5'>
                    <Button variant="contained" endIcon={<CancelIcon />} onClick={props.onClose} color='error'>
                        Cancelar
                    </Button>

                    <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleSubmit}>
                        Crear
                    </Button>
                </div>
            </form>
        </>
    )
}