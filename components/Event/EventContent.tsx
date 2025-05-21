'use client'
import { useState } from 'react'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import AddEventForm from '@/components/Event/Form/AddEventForm'
import useSWR from 'swr'
import { fetchAllEvent, fetchAllEventUrl } from '@/lib/request/event'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import EventItem from '@/components/Event/EventItem';
import SectionHeader from "../Common/SectionHeader";
import LoadingFull from '@/components/Loading/LoadingFull'
import { useSession } from "next-auth/react";
import {Event,emptyEvent} from "@/types/event";
import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";


export default function EventContent() {
    const { data: session, status } = useSession();
    const { data, isLoading, error, mutate } = useSWR(fetchAllEventUrl, fetchAllEvent)

    const events = data ? data.result as Event[] : [emptyEvent]

    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let filterEvents = events
    if (searchTerm != "" && filterEvents.length > 0) {
        filterEvents = events.filter(event => event.name === searchTerm)
    }


    return (
        <>

            <div className="shape shape-left ">
                <img src="/images/shape/shape-6a.svg" alt=""/>
            </div>
            <div className="shape shape-right">
                <img src="/images/shape/shape-7a.svg" alt=""/>
            </div>
            {/* <!-- ===== Blog Grid Start ===== --> */}
            <section className="py-20 lg:py-25 xl:py-30">
                <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
                    <SectionHeader
                        headerInfo={{
                            title: "Infociencia",
                            subtitle: "Eventos",
                            description: `Experimentos, Innovación y Asombro`,
                        }}
                    />
                </div>



                <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">

                    {
                        status === "loading" ?
                            <>
                            </>
                            :
                            <>
                                <div className="flex justify-between gap-5">
                                    <TextField
                                        required
                                        id="search"
                                        name="search"
                                        aria-label='Buscar'
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="end">
                                                        <SearchIcon className='dark:text-white ' />
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                        className='justify-start dark:text-white border-white ml-5 py-5'
                                    />

                                    {
                                        session?.user && session.user.role === 'ADMIN' &&
                                        <Button variant="outlined" startIcon={<AddCircleIcon />} className="dark:text-white justify-end" onClick={handleOpen}>
                                            Adicionar
                                        </Button>
                                    }

                                </div>

                            </>
                    }


                    {
                        isLoading || error ?
                            <>
                                <div className='w-full mx-auto justify-center items-center mt-5'>
                                    <LoadingFull />
                                </div>
                            </>
                            :

                            <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-2 xl:gap-10">
                                {
                                    filterEvents.map((event, key) => (
                                        <div key={key} className='flex gap-5'>
                                            <EventItem event={event} mutate={mutate} />
                                        </div>
                                    ))
                                }
                            </div>

                    }


                </div>
            </section>
            {/* <!-- ===== Blog Grid End ===== --> */}


            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                aria-labelledby="fullscreen-upload-dialog"
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center justify-center mx-auto'>
                        Adicionar Evento
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <AddEventForm onClose={handleClose} mutate={mutate} />
                </DialogContent>
            </Dialog>
        </>



    )
}