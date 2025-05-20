"use client";
import {useSession} from "next-auth/react";
import {useState} from 'react'
import {motion} from "framer-motion";
import Image from "next/image";
import {Course} from '@/types/course'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import EditCourseForm from '@/components/Course/Form/EditCourseForm'
import DeleteCourseForm from '@/components/Course/Form/DeleteCourseForm'
import {normalizeDate} from '@/utils/date'
import Divider from '@mui/material/Divider';
import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";
import CancelIcon from '@mui/icons-material/Cancel';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {Center} from "@/types/center";

type Props = {
    course: Course
    mutate: () => Promise<any>
    centers: Center[]
}

const styleDelete = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CourseItem = (props: Props) => {
    const {data: session, status} = useSession();
    const course = props.course


    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalDetail, setOpenModalDetail] = useState(false);

    const handleOpenModalEdit = () => setOpenModalEdit(true);
    const handleCloseModalEdit = () => setOpenModalEdit(false);

    const handleOpenModalDelete = () => setOpenModalDelete(true);
    const handleCloseModalDelete = () => setOpenModalDelete(false);

    const handleOpenModalDetail = () => setOpenModalDetail(true);
    const handleCloseModalDetail = () => setOpenModalDetail(false);


    return (
        <>
            <motion.div
                variants={{
                    hidden: {
                        opacity: 0,
                        y: -20,
                    },

                    visible: {
                        opacity: 1,
                        y: 0,
                    },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{duration: 1, delay: 0.5}}
                viewport={{once: true}}
                className="animate_top rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
            >
                <div>
                    <Image src={course.logo ? course.logo : '/images/center/blog-04.png'} alt='images' width={200}
                           height={200}/>
                    <div className="px-4">
                        <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">

                            {course.name}

                        </h3>


                        <p className="line-clamp-3"><span className='font-bold'>Claustro:</span>{course.cloister}</p>
                        <p className="line-clamp-3"><span className='font-bold'>Estado:</span>{course.state === 'ACTIVE' ? 'Activo' : 'Inactivo'}</p>
                        <p className="line-clamp-3"><span
                            className='font-bold'>Fecha Inicio:</span>{normalizeDate(course.dateStart)}</p>
                        <p className="line-clamp-3"><span
                            className='font-bold'>Fecha Fin:</span>{normalizeDate(course.dateEnd)}</p>

                        <div className="mt-3">
                            <Divider/>

                            {
                                status === "loading" ?
                                    <>
                                    </>
                                    :
                                    <div className='justify-end flex'>
                                        <Tooltip title="Detalles" placement="top">
                                            <Button size="small" endIcon={<RemoveRedEyeIcon/>}
                                                    onClick={handleOpenModalDetail}></Button>
                                        </Tooltip>

                                        {
                                            session?.user && session.user.role === 'ADMIN' &&
                                            <>

                                                <Tooltip title="Eliminar" placement="top">
                                                    <Button size="small" endIcon={<DeleteIcon/>} color="error"
                                                            onClick={handleOpenModalDelete}></Button>
                                                </Tooltip>


                                                <Tooltip title="Editar" placement="top">
                                                    <Button size="small" endIcon={<EditIcon/>}
                                                            onClick={handleOpenModalEdit}></Button>
                                                </Tooltip>
                                            </>
                                        }
                                    </div>
                            }

                        </div>
                    </div>
                </div>
            </motion.div>

            <Dialog
                fullScreen
                open={openModalEdit}
                onClose={handleCloseModalEdit}
                aria-labelledby="fullscreen-upload-dialog"
            >
                <DialogTitle sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2"
                                className='text-center justify-center mx-auto'>
                        Editar Curso
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleCloseModalEdit}>
                        <Close/>
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <EditCourseForm onClose={handleCloseModalEdit} mutate={props.mutate} course={course} centers={props.centers}/>
                </DialogContent>
            </Dialog>


            <Modal
                open={openModalDelete}
                onClose={handleCloseModalDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleDelete}>
                    <Typography id="modal-modal-title" variant="h6" component="h2"
                                className='text-center justify-center'>
                        Eliminar Curso
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2"
                                className='text-center justify-center text-danger color-danger'>
                        Esta Accion no es REVERSIBLE
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>

                    </Typography>
                    <DeleteCourseForm onClose={handleCloseModalDelete} mutate={props.mutate} course={course}/>
                </Box>
            </Modal>


            <Modal
                open={openModalDetail}
                onClose={handleCloseModalDetail}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleDelete}>
                    <Typography id="modal-modal-title" variant="h6" component="h2"
                                className='text-center justify-center'>
                        Detalles del Curso
                    </Typography>
                    <div>
                        {
                            course.logo &&
                            <div className='mx-auto justify-center text-center'>
                                <Image src={course.logo} alt='logo' width={300} height={300}/>
                            </div>
                        }

                        <div className='mt-2'>
                            <p className="font-small text-black">
                                <span className='font-bold'>Nombre:</span>{course.name}
                            </p>
                            <p className="font-small text-black">
                                <span className='font-bold'>Claustro:</span>{course.cloister}
                            </p>
                            <p className="font-small text-black">
                                <span
                                    className='font-bold'>Estado:</span>{course.state === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                            </p>
                            <p className="font-small text-black">
                                <span className='font-bold'>Fecha Inicio:</span>{normalizeDate(course.dateStart)}
                            </p>
                            <p className="font-small text-black">
                                <span className='font-bold'>Fecha Fin:</span>{normalizeDate(course.dateEnd)}
                            </p>

                            <p className="font-small text-black">
                                <span className='font-bold'>Descripción:</span>
                            </p>

                            <TextareaAutosize
                                aria-label="Descripcion"
                                style={{width: '100%', padding: 5}}
                                value={course.description}
                                disabled
                            />


                            <div className='mx-auto justify-center text-center mt-5'>
                                <Button variant="contained" endIcon={<CancelIcon/>} onClick={handleCloseModalDetail}
                                        color='error'>
                                    Cerrar
                                </Button>

                            </div>
                        </div>
                    </div>

                </Box>
            </Modal>



        </>


    );
};

export default CourseItem;
