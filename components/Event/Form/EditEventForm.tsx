'use client'
import {useState, ChangeEvent} from 'react'
import {useSnackbar} from 'notistack';
import {Event, EventPayload} from '@/types/event'
import {GenericResponse} from '@/types/response'

import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {editEvent} from '@/lib/request/event';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs, {Dayjs} from 'dayjs';
import FullDrop from "@/components/DropZone/FullDrop";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

type FormData = {
    name: string;
    area?: string;
    description: string;
    host: string;
    logo?: string
}

type FormErrors = {
    name?: string
    area?: string
    description?: string
    host?: string
    dateStart?: string
    dateEnd?: string
}

const emptyFormError: FormErrors = {
    name: '',
    area: '',
    description: '',
    host: '',
    dateStart: '',
    dateEnd: ''
}


type Props = {
    mutate?: () => Promise<any>
    onClose?: () => void
    event: Event
}


export default function EditEventForm(props: Props) {
    const event = props.event

    const {enqueueSnackbar} = useSnackbar()


    const currentCenter: FormData = {
        name: event.name,
        area: event.area,
        description: event.description,
        logo: event.logo,
        host: event.host

    }

    const [errors, setErrors] = useState<FormErrors>(emptyFormError)
    const [formData, setFormData] = useState<FormData>(currentCenter);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [dateStart, setDateStart] = useState<Dayjs | null>(dayjs());
    const [dateEnd, setDateEnd] = useState<Dayjs | null>(dayjs());


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


        // if (formData.name === "") {
        //     newErrors.name = 'Nombre requerido';
        // }
        //
        // if (formData.area === "") {
        //     newErrors.area = 'Area requerida';
        // }
        if (formData.description === "") {
            newErrors.description = 'Descripción requerida';
        }

        if (formData.host === "") {
            newErrors.host = 'Anfitrión requerido';
        }

        if (!dateStart) {
            newErrors.dateStart = 'Fecha de Inicio requerida';
        }
        if (!dateEnd) {
            newErrors.dateEnd = 'Fecha de Fin requerida';
        }
        if (dateStart && dateEnd && dateStart !== dateEnd) {
            if (dateStart > dateEnd || dateEnd < dateStart) {
                newErrors.dateStart = 'Rango de fecha incorrecto';
                newErrors.dateEnd = 'Rango de fecha incorrecto';
            }
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
            const payload: EventPayload = {
                name: formData.name,
                area: formData.area,
                host: formData.host,
                logo: uploadedUrl,
                dateEnd: dateEnd ? dateEnd : new Date(),
                description: formData.description,
                dateStart: dateStart ? dateStart : new Date()
            }

            console.log('Payload FRONT', payload);
            const res: GenericResponse = await editEvent(payload, event.id)

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


    return (
        <>
            <form noValidate onSubmit={handleSubmit}>
                <div className="w-full grid cols-1 gap-4 mt-5 min-w-[800px]">

                    <div className='flex w-full mx-auto justify-center'>


                        {/* Resultado */}
                        {uploadedUrl && (
                            <div className='ml-5'>
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
                        <FullDrop
                            onUpload={handleFileUpload}
                            isUploading={isUploading}

                        />
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
                        id="host"
                        name="host"
                        label="Anfitrión"
                        onFocus={cleanErrors}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                        defaultValue={formData.host}
                    />

                    <p>Descripción:</p>
                    <TextareaAutosize
                        required
                        aria-label="Descripcion del Evento"
                        minRows={10}
                        placeholder="Escriba una breve descripción de su evento"
                        id='description'
                        name='description'
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(event)}
                        onFocus={cleanErrors}
                        style={{border: 'solid 2px', padding: 5}}
                        defaultValue={formData.description}
                    />


                    <div className='grid grid-cols-2 gap-5'>
                        <DatePicker
                            label="Fecha de Inicio"
                            value={dateStart}
                            onChange={(newValue) => setDateStart(newValue)}
                            slotProps={{
                                textField: {
                                    helperText: errors.dateStart,
                                },
                            }}
                        />

                        <DatePicker
                            label="Fecha de Fin"
                            value={dateEnd}
                            onChange={(newValue) => setDateEnd(newValue)}
                            slotProps={{
                                textField: {
                                    helperText: errors.dateEnd,
                                },
                            }}
                        />
                    </div>

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