'use client'
import useSWR from 'swr'
import {useSnackbar} from 'notistack';
import {PostFull, emptyPostFull} from '@/types/post'
import {getFetchPostDetailsUrl, fetchPostDetails} from '@/lib/request/post'
import LoadingFull from '@/components/Loading/LoadingFull'
import Modal from "@mui/material/Modal";
import {Box, Chip, Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";
import {normalizeDate} from "@/utils/date";
import Link from "next/link";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


type Props = {
    openModalDetail: boolean;
    handleCloseModalDetail: () => void;
    postId: string;
}

export default function CommentModal(props: Props) {
    const {enqueueSnackbar} = useSnackbar()

    const {data, isLoading, error, mutate} = useSWR(getFetchPostDetailsUrl(props.postId), fetchPostDetails)
    const post = data ? data.result as PostFull : emptyPostFull

    if(error){
        enqueueSnackbar(error, {variant: 'error'})
        props.handleCloseModalDetail()
    }

    return (
        <>
            {
                isLoading  ?
                    <LoadingFull/>
                    :
                    <Modal
                        open={props.openModalDetail}
                        onClose={props.handleCloseModalDetail}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2"
                                        className='text-center justify-center'>
                                Detalles del Artículo
                            </Typography>
                            <Typography id="modal-modal-description" sx={{mt: 2}}>

                                <div className="mb-10 w-full overflow-hidden ">
                                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44] max-w-[300px] max-h-[300px]">
                                        <Image
                                            src={post.thumbnail ? post.thumbnail : "/images/blog/blog-01.png"}
                                            alt="Kobe Steel plant that supplied"
                                            fill
                                            className="rounded-md object-cover object-center"
                                        />
                                    </div>
                                </div>
                                <div className='mt-2'>
                                    <p className="font-small text-black">
                                        <span className='font-bold'>Autor:</span> {post ? post.author : ""}
                                    </p>
                                    <p className="font-small text-black">
                                        <span className='font-bold'>Publicado:</span>{post ? normalizeDate(post.createdAt) : ""}
                                    </p>
                                    <p className="font-small text-black">
                                        <span className='font-bold'>Url:</span><Link href={post.url ? post.url : "#"}>{post.url}</Link>
                                    </p>
                                    <p className="font-small text-black">
                                        <span className='font-bold'>Título:</span>{post.title}
                                    </p>
                                    <p className="font-small text-black">
                                        <span className='font-bold'>Tags:</span>{post.tags}
                                    </p>
                                    <div className="mt-3">

                                        <span className='font-small text-black font-bold'>Tags:</span>
                                        {
                                            post.tags && post.tags.length > 0 &&
                                            <Stack direction="row" spacing={1}>
                                                {
                                                    post.tags.split(',').map((tag, key) => (
                                                        <Chip key={key} label={`#${tag}`} variant="outlined" className="dark:text-white"/>
                                                    ))
                                                }
                                            </Stack>
                                        }
                                    </div>
                                    <p className="font-small text-black">
                                        <span className='font-bold'>Descripción:</span>{post.description}
                                    </p>
                                </div>

                                <div className='mx-auto justify-center text-center mt-5'>
                                    <Button variant="contained" endIcon={<CloseIcon/>} onClick={props.handleCloseModalDetail}
                                            color='error'>
                                        Cerrar
                                    </Button>

                                </div>


                            </Typography>

                        </Box>
                    </Modal>
            }

        </>
    )
}