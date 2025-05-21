'use client'
import { useState } from 'react'
import { useSession } from "next-auth/react";
import BlogItem from "@/components/Blog/BlogItem";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddPostForm from '@/components/Blog/Form/AddPostForm'
import useSWR from 'swr'
import { fetchAllPost, fetchAllPostUrl } from '@/lib/request/post'
import { Post, emptyPost } from '@/types/post'
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import SectionHeader from "../Common/SectionHeader";
import { fetchAllCenter, fetchAllCenterUrl } from '@/lib/request/center'
import { Center, emptyCenter } from '@/types/center'
import { Close } from '@mui/icons-material';
import LoadingFull from '@/components/Loading/LoadingFull'


import {
    TextField,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography
} from '@mui/material';

export default function BlogContent() {
    const { data: session, status } = useSession();


    const { data, isLoading, error, mutate } = useSWR(fetchAllPostUrl, fetchAllPost)
    const posts = data ? data.result as Post[] : [emptyPost]

    const { data: dataCenter, isLoading: isLoadingCenter, error: errorCenter, mutate: mutateCenter } = useSWR(fetchAllCenterUrl, fetchAllCenter)

    const centers = dataCenter ? dataCenter.result as Center[] : [emptyCenter]

    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let filterPost = posts
    if (searchTerm !== "") {
        filterPost = posts.filter(post => post.title === searchTerm)
    }


    return (
        <>

            <div className="shape shape-left ">
                <img src="/images/shape/shape-2a.svg" alt=""/>
            </div>
            <div className="shape shape-right">
                <img src="/images/shape/shape-5a.svg" alt=""/>
            </div>
            {/* <!-- ===== Blog Grid Start ===== --> */}
            <section className="py-20 lg:py-25 xl:py-30">
                <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
                    <SectionHeader
                        headerInfo={{
                            title: "Infociencia",
                            subtitle: "Artículos",
                            description: `Donde la curiosidad se encuentra con la evidencia.`,
                        }}
                    />
                </div>
                <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">

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
                                            <SearchIcon className='dark:text-white '/>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                            className='justify-start dark:text-white border-white ml-5 py-5'
                        />

                        {
                            status === "loading" ?
                                <>
                                </>
                                :
                                <>
                                    {
                                        session?.user && session.user.role === 'ADMIN' &&
                                        <Button variant="outlined" startIcon={<AddCircleIcon/>}
                                                className="dark:text-white justify-end" onClick={handleOpen}>
                                            Adicionar
                                        </Button>
                                    }
                                </>
                        }
                    </div>


                    {
                        isLoading || error ?
                            <div className='w-full mx-auto justify-center items-center mt-5'>
                                <LoadingFull/>
                            </div>
                            :

                            <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                                {
                                    filterPost.map((post, key) => (
                                        <BlogItem key={key} post={post} mutate={mutate} centers={centers}/>
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
                        Adicionar Articulo
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={handleClose}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <AddPostForm onClose={handleClose} mutate={mutate} centers={centers} />
                </DialogContent>
            </Dialog>
        </>



    )
}