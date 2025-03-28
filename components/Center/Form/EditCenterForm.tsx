'use client'
import { useState, ChangeEvent } from 'react'
import { useSnackbar } from 'notistack';
import { Center, CenterPayload } from '@/types/center'
import { GenericResponse } from '@/types/response'

import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { editCenter } from '@/lib/request/center';

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
    center: Center
}



export default function EditCenterForm(props: Props) {
    const center = props.center

    const { enqueueSnackbar } = useSnackbar()



    const currentCenter: FormData = {
        name: center.name,
        area: center.area,
        grade: center.grade,
        logo: center.logo,

    }

    const [errors, setErrors] = useState<FormErrors>(emptyFormError)
    const [formData, setFormData] = useState<FormData>(currentCenter);
    const [isLoading, setIsLoading] = useState<boolean>(false)
   

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

        if (validateForm()){
            const payload: CenterPayload = {
                name: formData.name,
                area: formData.area,
                grade: formData.grade,
                logo: formData.logo,
            }

            console.log('Payload FRONT', payload);
            const res: GenericResponse = await editCenter(payload , center.id)

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
                        id="name"
                        name="name"
                        label="Nombre"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                        error={errors.name !== ""}
                        helperText={errors.name}
                        onFocus={cleanErrors}
                        defaultValue={formData.name}
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
                        defaultValue={formData.area}
                   />


                    <TextField
                        id="grade"
                        name="grade"
                        label="Grado"
                        onFocus={cleanErrors}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                        defaultValue={formData.grade}
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