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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";
import AddCenterForm from "@/components/Center/Form/AddCenterForm";




type Props = {
    center: Center
    mutate: () => Promise<any>
}

const style = {
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
                className="animate_top  p-4 pb-9 "
            >
                <div>
                    <Card sx={{ width: 345 , height: 400 }}>
                        <CardMedia
                            className='w-[200] h-[200] bg-cover'
                            component="img"
                            alt="center img"
                            height={200}
                            width={200}
                            image={center.logo ? center.logo : '/images/center/blog-04.png'}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {center.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                <span className='font-bold'>Área:</span>{center.area}
                            </Typography>
                        </CardContent>
                        <Divider/>
                        <CardActions className='justify-end'>
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
                        </CardActions>
                    </Card>
                </div>
            </motion.div>


            <Dialog
                fullScreen
                open={openModalEdit}
                onClose={handleCloseModalEdit}
                aria-labelledby="fullscreen-upload-dialog"
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center justify-center mx-auto'>
                        Editar Centro
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleCloseModalEdit}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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


            <Modal
                open={openModalDetail}
                onClose={handleCloseModalDetail}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2"
                                className='text-center justify-center'>
                        Detalles del Centro
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>

                    </Typography>
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
                            <Button variant="contained" endIcon={<CancelIcon />} onClick={handleCloseModalDetail} color='error'>
                                Cerrar
                            </Button>

                        </div>


                    </div>
                </Box>
            </Modal>
        </>


    );
};

export default CenterItem;
