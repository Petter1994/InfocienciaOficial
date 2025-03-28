"use client";
import { useState } from 'react'
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PostFull } from '@/types/post'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';

import EditPostForm from '@/components/Blog/Form/EditPostForm'
import DeletePostForm from '@/components/Blog/Form/DeletePostForm'
import { normalizeDate } from '@/utils/date'
import { Center } from '@/types/center'


import {
  Stack,
  Chip,
  Box,
  Button,
  Typography
} from '@mui/material';

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

type Props = {
  post: PostFull
  mutate: () => Promise<any>
  centers: Center[]
}

const BlogItem = (props: Props) => {
  const post = props.post

  console.log('Post', post)


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
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="animate_top rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
      >
        <Link href={`/blog/blog-details/${post.id}`} className="relative block aspect-[368/239]">
          <Image src={post.thumbnail ? post.thumbnail : '/images/blog/blog-01.png'} alt={post.title} fill />
        </Link>

        <div className="px-4">
          <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
            <Link href={`/blog/blog-details/${post.id}`}>
              {post.title}
            </Link>
          </h3>

          <div className=''>
            <h3 className="mb-1 mt-7.5  text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
              {post.author}
            </h3>
            <p className="font-small text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
              {normalizeDate(post.createdAt)}
            </p>
          </div>
          <p className="line-clamp-3">{post.body}</p>
          <div className="mt-3">



            <Stack direction="row" spacing={1}>
              {
                post.tags.split(',').map((tag, key) => (
                  <Chip key={key} label={`#${tag}`} variant="outlined" className="dark:text-white" />
                ))
              }
            </Stack>

            <div className='justify-end flex'>
              <Tooltip title="Eliminar" placement="top">
                <Button size="small" endIcon={<DeleteIcon />} color="error" onClick={handleOpenModalDelete}></Button>
              </Tooltip>


              <Tooltip title="Editar" placement="top">
                <Button size="small" endIcon={<EditIcon />} onClick={handleOpenModalEdit}></Button>
              </Tooltip>

            </div>

          </div>
        </div>
      </motion.div>





      <Modal
        open={openModalEdit}
        onClose={handleCloseModalEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center justify-center'>
            Editar Articulo
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>

          </Typography>
          <EditPostForm onClose={handleCloseModalEdit} mutate={props.mutate} post={post} centers={props.centers}/>
        </Box>
      </Modal>


      <Modal
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleDelete}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center justify-center'>
            Eliminar Articulo
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center justify-center text-danger color-danger'>
            Esta Accion no es REVERSIBLE
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>

          </Typography>
          <DeletePostForm onClose={handleCloseModalDelete} mutate={props.mutate} post={post} />
        </Box>
      </Modal>

    </>
  );
};

export default BlogItem;
