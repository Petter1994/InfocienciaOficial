"use client";
import { useSession } from "next-auth/react";
import { useState } from 'react'
import { motion } from "framer-motion";
import Image from "next/image";
import { Center } from '@/types/center'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import EditCenterForm from '@/components/Center/Form/EditCenterForm'
import DeleteCenterForm from '@/components/Center/Form/DeleteCenterForm'
import LoadingFull from '@/components/Loading/LoadingFull'

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
  const { data: session, status } = useSession();
  const center = props.center


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
        <div>
          <Image src={center.logo ? center.logo : '/images/center/blog-04.png'} alt='images' width={200} height={200} />
          <div className="px-4">
            <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">

              {center.name}

            </h3>


            <p className="line-clamp-3">{center.area}</p>
            <p className="line-clamp-3">{center.grade}</p>
            <div className="mt-3">


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
                          <Button size="small" endIcon={<DeleteIcon />} color="error" onClick={handleOpenModalDelete}></Button>
                        </Tooltip>


                        <Tooltip title="Editar" placement="top">
                          <Button size="small" endIcon={<EditIcon />} onClick={handleOpenModalEdit}></Button>
                        </Tooltip>

                      </div>
                    }
                  </>
              }

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
            Editar Centro
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>

          </Typography>
          <EditCenterForm onClose={handleCloseModalEdit} mutate={props.mutate} center={center} />
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
            Eliminar Centro
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center justify-center text-danger color-danger'>
            Esta Accion no es REVERSIBLE
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>

          </Typography>
          <DeleteCenterForm onClose={handleCloseModalDelete} mutate={props.mutate} center={center} />
        </Box>
      </Modal>
    </>



  );
};

export default CenterItem;
