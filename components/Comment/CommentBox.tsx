'use client'
import {useState} from 'react'
import {PostFull} from '@/types/post'
import AddCommentIcon from '@mui/icons-material/AddComment';
import Button from '@mui/material/Button';
import CommentList from '@/components/Comment/CommentList'
import AddCommentForm from '@/components/Comment/Form/AddCommentForm'
import {Box, Typography} from "@mui/material";
import Modal from "@mui/material/Modal";


type Props = {
    post: PostFull
    mutate: () => Promise<any>
}

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

export default function CommentBox(props: Props) {
    const post = props.post

    const [openModalComment, setOpenModalComment] = useState(false);

    const handleOpenModalComment = () => setOpenModalComment(true);
    const handleCloseModalComment = () => setOpenModalComment(false);


    return (
        <>
            <div
                className="mt-5 animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">

                <div className="flex justify-end">
                    <Button variant="contained" onClick={handleOpenModalComment} endIcon={<AddCommentIcon/>}>
                        Comentar
                    </Button>
                </div>
                {
                    post.comments &&
                    <>
                        <CommentList comments={post.comments}/>
                    </>
                }

            </div>



            <Modal
                open={openModalComment}
                onClose={handleCloseModalComment}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center justify-center'>
                        Comentar
                    </Typography>
                    <AddCommentForm onClose={handleCloseModalComment} mutate={props.mutate} postId={post.id} />
                </Box>
            </Modal>


        </>
    )
}