'use client'
import {useState, ChangeEvent} from 'react'
import {useSnackbar} from 'notistack';
import {Center, CenterPayload} from '@/types/center'
import {GenericResponse} from '@/types/response'

import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {editCenter} from '@/lib/request/center';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import FullDrop from "@/components/DropZone/FullDrop"

type FormData = {
    name: string;
    vision: string;
    mission: string;
    investigationLine: string;
    projects: string;
    services: string;
    results: string;
    strategy: string;
    investigators: number;
    investigatorsDoc: number;
    investigatorsMaster: number;
    discipline: string;
    area: string;
    logo?: string
}

type FormErrors = {
    name?: string;
    vision?: string;
    mission?: string;
    investigationLine?: string;
    projects?: string;
    services?: string;
    results?: string;
    strategy?: string;
    discipline?: string;
    area?: string;
    logo?: string;
    investigators?: string;
    investigatorsDoc?: string;
    investigatorsMaster?: string;
}

const emptyFormError: FormErrors = {
    name: '',
    area: '',
    logo: '',
    results: '',
    strategy: '',
    investigationLine: '',
    discipline: '',
    mission: '',
    projects: '',
    vision: '',
    services: '',
    investigators: '',
    investigatorsDoc: '',
    investigatorsMaster: '',
}


type Props = {
    mutate?: () => Promise<any>
    onClose?: () => void
    center: Center
}


export default function EditCenterForm(props: Props) {
    const center = props.center

    const {enqueueSnackbar} = useSnackbar()


    const currentCenter: FormData = {
        name: center.name,
        area: center.area,
        logo: center.logo,
        results: center.results,
        strategy: center.strategy,
        investigationLine: center.investigationLine,
        discipline: center.discipline,
        mission: center.mission,
        projects: center.projects,
        vision: center.vision,
        investigators: center.investigators,
        investigatorsDoc: center.investigatorsDoc,
        investigatorsMaster: center.investigatorsMaster,
        services: center.services

    }

    const [errors, setErrors] = useState<FormErrors>(emptyFormError)
    const [formData, setFormData] = useState<FormData>(currentCenter);
    const [isLoading, setIsLoading] = useState<boolean>(false)
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

    const cleanForm = () => {
        setErrors(emptyFormError)
    }


    const validateForm = () => {
        const newErrors: FormErrors = {};


        if (formData.name === "") {
            newErrors.name = 'Nombre requerido';
        }
        if (formData.vision === "") {
            newErrors.vision = 'Visión requerida';
        }
        if (formData.mission === "") {
            newErrors.mission = 'Misión requerida';
        }
        if (formData.investigationLine === "") {
            newErrors.investigationLine = 'Líneas de investigación requerida';
        }
        if (formData.projects === "") {
            newErrors.projects = 'Proyectos requerido';
        }
        if (formData.services === "") {
            newErrors.services = 'Servicios requerido';
        }
        if (formData.results === "") {
            newErrors.results = 'Resultados requerido';
        }
        if (formData.strategy === "") {
            newErrors.strategy = 'Estrategia requerida';
        }
        if (formData.investigators < 0) {
            newErrors.investigators = 'Número Incorrecto'
        }
        if (formData.investigatorsDoc < 0) {
            newErrors.investigatorsDoc = 'Número Incorrecto'
        }
        if (formData.investigatorsMaster < 0) {
            newErrors.investigatorsMaster = 'Número Incorrecto'
        }
        if (formData.investigatorsMaster > formData.investigators || formData.investigatorsDoc > formData.investigators) {
            newErrors.investigatorsDoc = 'Excede la cantidad de Investigadores del Centro'
            newErrors.investigatorsMaster = 'Excede la cantidad de Investigadores del Centro'
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
                discipline: formData.discipline,
                investigatorsDoc: Number(formData.investigatorsDoc),
                investigators: Number(formData.investigators),
                investigatorsMaster: Number(formData.investigatorsMaster),
                projects: formData.projects,
                services: formData.services,
                mission: formData.mission,
                results: formData.results,
                strategy: formData.strategy,
                investigationLine: formData.investigationLine,
                vision: formData.vision,
                logo: uploadedUrl,
            }

            console.log('Payload FRONT', payload);
            const res: GenericResponse = await editCenter(payload, center.id)

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

                    <div className='grid grid-cols-1 gap-5'>


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
                            id="vision"
                            name="vision"
                            label="Visión"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                            error={errors.vision !== ""}
                            helperText={errors.vision}
                            onFocus={cleanErrors}
                            defaultValue={formData.vision}
                        />

                        <TextField
                            required
                            id="mission"
                            name="mission"
                            label="Misión"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                            error={errors.mission !== ""}
                            helperText={errors.mission}
                            onFocus={cleanErrors}
                            defaultValue={formData.mission}
                        />
                        <TextField
                            required
                            id="investigationLine"
                            name="investigationLine"
                            label="Línea de Investigación"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                            error={errors.investigationLine !== ""}
                            helperText={errors.investigationLine}
                            onFocus={cleanErrors}
                            defaultValue={formData.investigationLine}
                        />
                        <TextField
                            required
                            id="projects"
                            name="projects"
                            label="Proyectos"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                            error={errors.projects !== ""}
                            helperText={errors.projects}
                            onFocus={cleanErrors}
                            defaultValue={formData.projects}
                        />
                        <TextField
                            required
                            id="services"
                            name="services"
                            label="Servicios"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                            error={errors.services !== ""}
                            helperText={errors.services}
                            onFocus={cleanErrors}
                            defaultValue={formData.services}
                        />
                        <TextField
                            required
                            id="results"
                            name="results"
                            label="Resultados"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                            error={errors.results !== ""}
                            helperText={errors.results}
                            onFocus={cleanErrors}
                            defaultValue={formData.results}
                        />
                        <TextField
                            required
                            id="strategy"
                            name="strategy"
                            label="Estrategia"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                            error={errors.strategy !== ""}
                            helperText={errors.strategy}
                            onFocus={cleanErrors}
                            defaultValue={formData.strategy}
                        />
                        <TextField
                            required
                            id="discipline"
                            name="discipline"
                            label="Disciplina"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                            error={errors.discipline !== ""}
                            helperText={errors.discipline}
                            onFocus={cleanErrors}
                            defaultValue={formData.discipline}
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
                            required
                            id="investigators"
                            name="investigators"
                            label="Cant.Investigadores"
                            type="number"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                            error={errors.investigators !== ""}
                            helperText={errors.investigators}
                            onFocus={cleanErrors}
                            defaultValue={formData.investigators}
                        />
                        <TextField
                            required
                            id="investigatorsDoc"
                            name="investigatorsDoc"
                            label="Cant.Investigadores con categoría  Docente"
                            type="number"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                            error={errors.investigatorsDoc !== ""}
                            helperText={errors.investigatorsDoc}
                            onFocus={cleanErrors}
                            defaultValue={formData.investigatorsDoc}
                        />
                        <TextField
                            required
                            id="investigatorsMaster"
                            name="investigatorsMaster"
                            label="Cant.Investigadores con grado de Master o Superior"
                            type="number"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                            error={errors.investigatorsMaster !== ""}
                            helperText={errors.investigatorsMaster}
                            onFocus={cleanErrors}
                            defaultValue={formData.investigatorsMaster}
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