
'use client'
import Image from "next/image";
import { useState } from 'react'
import { PostFull } from '@/types/post'
import { useSession } from "next-auth/react";
import { normalizeDate } from '@/utils/date'
import AddCommentIcon from '@mui/icons-material/AddComment';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Comment, CommentPayload } from '@/types/comment'
import { createComment } from '@/lib/request/comment'
import { useSnackbar } from 'notistack';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Loading from '@/components/Loading/Loading'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { User } from '@/types/user'
import CommentList from '@/components/Comment/CommentList'

type Props = {
    post: PostFull
    mutate: () => Promise<any>
    user?: User
}

export default function CommentBox({ post, mutate, user }: Props) {
    const { enqueueSnackbar } = useSnackbar()
    const { data: session, status } = useSession();

    const [content, setContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [comment, setComment] = useState(false);



    const submitComment = async () => {

        console.log('USwer', user)
        if (content !== "" && user) {
            setIsLoading(true)

            const payload: CommentPayload = {
                content: content,
                postId: post.id,
                authorId: user.id,
            }

            console.log('Payload FRONT', payload);
            const res: GenericResponse = await createComment(payload, post.id)

            console.log('RES FRONT', res)

            if (res.status_name === 'error') {
                enqueueSnackbar(res.error_title, { variant: 'error' })

            } else {
                enqueueSnackbar(res.status_message, { variant: 'success' });
                mutate && await mutate()

            }
            setIsLoading(false)
        }
        setIsLoading(false)
    };


    return (
        <>
            <div className="mt-5 animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">

                <div className="flex justify-end">
                    {
                        user &&
                        <Button variant="contained" onClick={() => setComment(!comment)} endIcon={<AddCommentIcon />} disabled={isLoading}>
                            Comentar
                        </Button>
                    }


                </div>

                {
                    comment &&
                    <div className="mt-5">
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <OutlinedInput
                                required
                                id="outlined-adornment-amount"
                                endAdornment={
                                    <InputAdornment position="start">
                                        <Button variant="contained" onClick={submitComment} disabled={content === ""}>
                                            <CheckCircleIcon />
                                        </Button>
                                    </InputAdornment>
                                }
                                label="Comentario"
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </FormControl>
                    </div>
                }

                {
                    post.comments &&
                    <>
                        <CommentList comments={post.comments}/>
                    </>
                }




            </div>


        </>
    )
}