'use client'
import { useState } from 'react'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import AddCourseForm from '@/components/Course/Form/AddCourseForm'
import useSWR from 'swr'
import { fetchAllCourse, fetchAllCourseUrl } from '@/lib/request/course'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import CourseItem from '@/components/Course/CourseItem';
import SectionHeader from "../Common/SectionHeader";
import LoadingFull from '@/components/Loading/LoadingFull'
import { useSession } from "next-auth/react";
import {Course,emptyCourse} from "@/types/course";
import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";


export default function CourseContent() {
    const { data: session, status } = useSession();
    const { data, isLoading, error, mutate } = useSWR(fetchAllCourseUrl, fetchAllCourse)

    const courses = data ? data.result as Course[] : [emptyCourse]

    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let filterCourses
    if (searchTerm != "" && filterCourses.length > 0) {
        filterCourses = courses.filter(course => course.name === searchTerm)
    }


    return (
        <>
            {/* <!-- ===== Blog Grid Start ===== --> */}
            <section className="py-20 lg:py-25 xl:py-30">
                <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
                    <SectionHeader
                        headerInfo={{
                            title: "Infociencia",
                            subtitle: "Cursos",
                            description: `Capacítate hoy, innova mañana.`,
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
                                    filterCourses.map((course, key) => (
                                        <div key={key} className='flex gap-5'>
                                            <CourseItem course={course} mutate={mutate} />
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
                        Adicionar Curso
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <AddCourseForm onClose={handleClose} mutate={mutate} />
                </DialogContent>
            </Dialog>
        </>



    )
}