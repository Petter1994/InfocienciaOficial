'use client'
import {useState} from 'react';
import {useSnackbar} from 'notistack';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Comment} from '@/types/comment';
import {IconButton} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {normalizeDate} from '@/utils/date'
import {activeComment, inactiveComment} from '@/lib/request/comment'
import {GenericResponse} from "@/types/response";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CommentModal from '@/components/Comment/Modal/CommentModal'


type Props = {
    comments: Comment[]
    mutate: () => Promise<any>
}

export default function CommentTable(props: Props) {
    const {enqueueSnackbar} = useSnackbar()
    const comments = props.comments

    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [selectedPost, setSelectedPost] = useState<string>('')


    const handleOpenModalDetail = (id: string) => {
        setSelectedPost(id)
        setOpenModalDetail(true)
    };

    const handleCloseModalDetail = () => setOpenModalDetail(false);


    const handleActive = async (id: number) => {
        const res: GenericResponse = await activeComment(id)

        if (res.status_name === 'error') {
            enqueueSnackbar(res.error_title, {variant: 'error'})

        } else {
            enqueueSnackbar(res.status_message, {variant: 'success'});
            props.mutate && await props.mutate()
        }
    }

    const handleInactive = async (id: number) => {
        const res: GenericResponse = await inactiveComment(id)

        if (res.status_name === 'error') {
            enqueueSnackbar(res.error_title, {variant: 'error'})

        } else {
            enqueueSnackbar(res.status_message, {variant: 'success'});
            props.mutate && await props.mutate()
        }
    }

    const getState = (state: string) => {
        return state === 'ACTIVE' ? 'Activo' : 'Inactivo'
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'name', headerName: 'Autor', width: 150},
        {field: 'content', headerName: 'Contenido', width: 300},
        {field: 'email', headerName: 'Correo', width: 200},
        {
            field: 'postId',
            headerName: 'Artículo',
            width: 100,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleOpenModalDetail(params.row.id)}>
                        <RemoveRedEyeIcon fontSize="small" color="warning"/>
                    </IconButton>
                </>
            ),
        },
        {
            field: 'createdAt',
            headerName: 'Fecha de Creación',
            width: 200,
            valueFormatter: (params) => normalizeDate(params)
        },
        {
            field: 'state',
            headerName: 'Estado',
            width: 120,
            valueFormatter: (params) => getState(params)
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 120,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleActive(params.row.id)}>
                        <CheckIcon fontSize="small" color="success"/>
                    </IconButton>
                    <IconButton onClick={() => handleInactive(params.row.id)}>
                        <CloseIcon fontSize="small" color="error"/>
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <>
            <div style={{height: 600, width: '100%'}}>
                <DataGrid
                    rows={comments}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                    getRowId={(row) => row.id}
                />
            </div>
            <CommentModal handleCloseModalDetail={handleCloseModalDetail} openModalDetail={openModalDetail}
                          postId={selectedPost}/>
        </>
    )
        ;
}