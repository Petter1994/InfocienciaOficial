'use client'
import { useState, ChangeEvent } from 'react'
import { useSnackbar } from 'notistack';
import { User, UserEditPayload } from '@/types/user'
import { GenericResponse } from '@/types/response'
import { editUser } from '@/lib/request/user'
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import { SelectChangeEvent } from '@mui/material/Select';
import FullDrop from "@/components/DropZone/FullDrop"
import { isValidEmail } from '@/utils/validations'
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';


import {
    Box,
    Button, Avatar, Modal,
    Typography, IconButton
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1024,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type FormData = {
    name: string
    email: string
    bio: string
}

type FormErrors = {
    name?: string
    email?: string
    bio?: string
}

const emptyFormError: FormErrors = {
    name: '',
    email: '',
    bio: '',
}


type Props = {
    user: User
    updateSeccion: () => void
}


export default function EditUserForm(props: Props) {
    const user = props.user
    console.log('User', user)
    const { enqueueSnackbar } = useSnackbar()


    const currentPost: FormData = {
        name: user.name ? user.name : "",
        email: user.email,
        bio: user.bio ? user.bio : "",
    }

    const [errors, setErrors] = useState<FormErrors>(emptyFormError)
    const [formData, setFormData] = useState<FormData>(currentPost);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedCenter, setSelectedCenter] = useState<string>("")
    const [uploadedUrl, setUploadedUrl] = useState<string>('');
    const [isUploading, setIsUploading] = useState(false);
    const [file, setFile] = useState(null)
    const [openModalEdit, setOpenModalEdit] = useState(false);


    const handleOpenModalEdit = () => setOpenModalEdit(true);
    const handleCloseModalEdit = () => setOpenModalEdit(false);


    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }



    const handleCansel = () => {
        setFormData(currentPost)
    }



    const validateForm = () => {
        const newErrors: FormErrors = {};


        if (formData.name === "") {
            newErrors.name = 'Nombre requerido';
        }

        if (formData.email === "") {
            newErrors.email = 'Email requerido';
        }

        if (!isValidEmail(formData.email)) {
            newErrors.email = 'Email no valido';
        }


        isValidEmail

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


    const handleSubmit = async () => {

        setIsLoading(true)

        if (validateForm()) {
            const payload: UserEditPayload = {
                name: formData.name,
                bio: formData.bio,
                email: formData.email,
                avatar: uploadedUrl !== "" ? uploadedUrl : '/images/user/user-01.png',
            }

            console.log('Payload FRONT', payload);

            //@ts-ignore
            const res: GenericResponse = await editUser(payload, user.id)

            console.log('RES FRONT', res)

            if (res.status_name === 'error') {
                enqueueSnackbar(res.error_title, { variant: 'error' })

            } else {
                enqueueSnackbar(res.status_message, { variant: 'success' });
                await props.updateSeccion()
            }
            setIsLoading(false)

        }
        setIsLoading(false)
    };


    return (
        <>
            <form noValidate onSubmit={handleSubmit}>


                <div className="w-full grid cols-1 gap-4 mt-5 min-w-[800px] mx-auto text-center justify-center">

                    <div className='justify-center mx-auto text-center'>
                        <div className='flex'>
                            {
                                uploadedUrl ?
                                    <Avatar
                                        sx={{ width: 100, height: 100 }}
                                        alt="avatar"
                                        src={uploadedUrl}
                                    >
                                    </Avatar>
                                    :
                                    <Avatar
                                        sx={{ width: 100, height: 100 }}
                                        alt="avatar"
                                        src={user.avatar ? user.avatar : ""}
                                    >
                                        {user.avatar ? "" : user.name?.charAt(0).toUpperCase()}
                                    </Avatar>

                            }

                            <div className='w-[50] align-bottom relative top-[60px]'>
                                <IconButton aria-label="delete" size="small" onClick={handleOpenModalEdit}>
                                    <EditIcon fontSize="inherit" />
                                </IconButton>
                            </div>
                        </div>

                    </div>


                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Nombre"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                        defaultValue={formData.name}
                        error={errors.name !== ""}
                        helperText={errors.name}
                        onFocus={cleanErrors}
                    />

                    <TextField
                        required
                        id="email"
                        name="email"
                        type='email'
                        label="Correo"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                        defaultValue={formData.email}
                        error={errors.email !== ""}
                        helperText={errors.email}
                        onFocus={cleanErrors}
                    />

                    <p>Biografía:</p>
                    <TextareaAutosize
                        aria-label="Biografía"
                        minRows={10}
                        placeholder="Escriba una breve Biografía"
                        id='bio'
                        name='bio'
                        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => handleInputChange(event)}
                        defaultValue={formData.bio ? formData.bio : ""}
                        onFocus={cleanErrors}
                        style={{ border: 'solid 2px', padding: 5 }}
                    />


                </div>

                <div className='flex justify-center align-middle text-center gap-5 mt-5'>
                    <Button variant="contained" endIcon={<CancelIcon />} onClick={handleCansel} color='error'>
                        Cancelar
                    </Button>

                    <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleSubmit}>
                        Aceptar
                    </Button>

                </div>
            </form>




            <Modal
                open={openModalEdit}
                onClose={handleCloseModalEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center justify-center'>
                        Cambiar foto de Avatar                      </Typography>

                    <div className='justify-center text-center mx-auto'>
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

                        <div className='flex justify-center align-middle text-center gap-5 mt-5'>
                            <Button variant="contained" endIcon={<CancelIcon />} onClick={handleCloseModalEdit} color='error'>
                                Cancelar
                            </Button>

                            <Button

                                variant="contained"
                                endIcon={<CancelIcon />}
                                onClick={handleCloseModalEdit}
                            >
                                Aceptar
                            </Button>

                        </div>


                    </div>
                </Box>
            </Modal>
        </>
    )
}