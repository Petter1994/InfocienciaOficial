"use client";
import {useSession} from "next-auth/react";
import {useState} from 'react'
import {motion} from "framer-motion";
import Image from "next/image";
import {Event} from '@/types/event'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import EditEventForm from '@/components/Event/Form/EditEventForm'
import DeleteEventForm from '@/components/Event/Form/DeleteEventForm'
import LoadingFull from '@/components/Loading/LoadingFull'
import {normalizeDate} from '@/utils/date'
import Divider from '@mui/material/Divider';
import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";
import AddEventForm from "@/components/Event/Form/AddEventForm";


type Props = {
    event: Event
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

const EventItem = (props: Props) => {
    const {data: session, status} = useSession();
    const event = props.event


    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const handleOpenModalEdit = () => setOpenModalEdit(true);
    const handleCloseModalEdit = () => setOpenModalEdit(false);

    const handleOpenModalDelete = () => setOpenModalDelete(true);
    const handleCloseModalDelete = () => setOpenModalDelete(false);


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
                    <Image src={event.logo ? event.logo : '/images/center/blog-04.png'} alt='images' width={200}
                           height={200}/>
                    <div className="px-4">
                        <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">

                            {event.name}

                        </h3>


                        <p className="line-clamp-3"><span className='font-bold'>Area:</span>{event.area}</p>
                        <p className="line-clamp-3"><span className='font-bold'>Anfitrión:</span>{event.host}</p>
                        <p className="line-clamp-3"><span className='font-bold'>Fecha
              Inicio:</span>{normalizeDate(event.dateStart)}</p>
                        <p className="line-clamp-3"><span className='font-bold'>Fecha
              Fin:</span>{normalizeDate(event.dateEnd)}</p>


                        <div className="mt-3">
                            <Divider/>

                            {
                                status === "loading" ?
                                    <>
                                    </>
                                    :
                                    <>
                                        {
                                            session?.user && session.user.role === 'ADMIN' &&
                                            <div className='justify-end flex'>
                                                <Tooltip title="Eliminar" placement="top">
                                                    <Button size="small" endIcon={<DeleteIcon/>} color="error"
                                                            onClick={handleOpenModalDelete}></Button>
                                                </Tooltip>


                                                <Tooltip title="Editar" placement="top">
                                                    <Button size="small" endIcon={<EditIcon/>}
                                                            onClick={handleOpenModalEdit}></Button>
                                                </Tooltip>

                                            </div>
                                        }
                                    </>
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
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center justify-center mx-auto'>
                        Editar Evento
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleCloseModalEdit}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <EditEventForm onClose={handleCloseModalEdit} mutate={props.mutate} event={event}/>
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
                        Eliminar Evento
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2"
                                className='text-center justify-center text-danger color-danger'>
                        Esta Accion no es REVERSIBLE
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>

                    </Typography>
                    <DeleteEventForm onClose={handleCloseModalDelete} mutate={props.mutate} event={event}/>
                </Box>
            </Modal>
        </>


    );
};

export default EventItem;
