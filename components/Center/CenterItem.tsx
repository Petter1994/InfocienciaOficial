"use client";
import {useSession} from "next-auth/react";
import {useState} from 'react'
import {motion} from "framer-motion";
import Image from "next/image";
import {Center} from '@/types/center'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import EditCenterForm from '@/components/Center/Form/EditCenterForm'
import DeleteCenterForm from '@/components/Center/Form/DeleteCenterForm'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Divider from '@mui/material/Divider';
import CancelIcon from '@mui/icons-material/Cancel';
import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";


type Props = {
    center: Center
    mutate: () => Promise<any>
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

const CenterItem = (props: Props) => {
    const {data: session, status} = useSession();
    const center = props.center


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
                <div className='max-w-[200px] max-h-[200px] mx-auto justify-center text-center'>
                    <Image src={center.logo ? center.logo : '/images/center/blog-04.png'} alt='image' height={100}
                           width={100} className='mx-auto justify-center text-center'/>
                </div>


                <div className="px-4">
                    <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">

                        {center.name}

                    </h3>


                    <div className=''>
                        <p className="font-small text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
                            <span className='font-bold'>Área:</span>{center.area}
                        </p>
                        <p className="font-small text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
                            <span className='font-bold'>Misión:</span>{center.mission}
                        </p>
                        <p className="font-small text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
                            <span className='font-bold'>Visión:</span>{center.vision}
                        </p>
                    </div>
                    <div className="mt-3">
                        <br className='border-4'></br>

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
                        Editar Centro
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleCloseModalEdit}>
                        <Close/>
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <EditCenterForm onClose={handleCloseModalEdit} mutate={props.mutate} center={center}/>
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
                        Eliminar Centro
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2"
                                className='text-center justify-center text-danger color-danger'>
                        Esta Accion no es REVERSIBLE
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>

                    </Typography>
                    <DeleteCenterForm onClose={handleCloseModalDelete} mutate={props.mutate} center={center}/>
                </Box>
            </Modal>


            <Dialog
                fullScreen
                open={openModalDetail}
                onClose={handleCloseModalDetail}
                aria-labelledby="fullscreen-upload-dialog"
            >
                <DialogTitle sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2"
                                className='text-center justify-center mx-auto'>
                        Detalles del Centro
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleCloseModalDetail}>
                        <Close/>
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div>
                        {
                            center.logo &&
                            <div className='mx-auto justify-center text-center'>
                                <Image src={center.logo} alt='logo' width={300} height={300}/>
                            </div>
                        }

                        <div className='mt-2'>
                            <p className="font-small text-black">
                                <span className='font-bold'>Nombre:</span>{center.name}
                            </p>
                            <p className="font-small text-black">
                                <span className='font-bold'>Área:</span>{center.area}
                            </p>
                            <p className="font-small text-black">
                                <span className='font-bold'>Misión:</span>{center.mission}
                            </p>
                            <p className="font-small text-black">
                                <span className='font-bold'>Disciplina:</span>{center.discipline}
                            </p>
                            <p className="font-small text-black">
                                <span className='font-bold'>Misión:</span>{center.mission}
                            </p>
                            <p className="font-small text-black">
                                <span className='font-bold'>Proyectos:</span>{center.projects}
                            </p>
                            <p className="font-small text-black">
                                <span className='font-bold'>Resultados:</span>{center.results}
                            </p>
                            <p className="font-small text-black">
                                <span className='font-bold'>Estrategia:</span>{center.strategy}
                            </p>
                            <p className="font-small text-black">
                                <span className='font-bold'>Visión:</span>{center.vision}
                            </p>
                            <p className="font-small text-black">
                                <span className='font-bold'>Línea de Investigación:</span>{center.investigationLine}
                            </p>
                            <p className="font-small text-black">
                                <span className='font-bold'>Investigadores:</span>{center.investigators}
                            </p>
                            <p className="font-small text-black">
                                <span
                                    className='font-bold'>Investigadores con Categoría Docentes:</span>{center.investigatorsDoc}
                            </p>
                            <p className="font-small text-black">
                <span
                    className='font-bold'>Investigadores con Grado Master o Superior:</span>{center.investigatorsMaster}
                            </p>
                        </div>

                        <div className='mx-auto justify-center text-center mt-5'>
                            <Button variant="contained" endIcon={<CancelIcon/>} onClick={handleCloseModalDetail}
                                    color='error'>
                                Cerrar
                            </Button>

                        </div>


                    </div>
                </DialogContent>
            </Dialog>


        </>


    );
};

export default CenterItem;
