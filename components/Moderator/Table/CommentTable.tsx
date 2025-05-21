'use client'
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Comment } from '@/types/comment';
import { IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { normalizeDate } from '@/utils/date'

type Props = {
    comments: Comment[]
}

export default function CommentTable(props: Props) {
    const comments = props.comments

   


    const handleEdit = (id: number) => {
        console.log('Editar comentario:', id);
    };

    const handleDelete = (id: number) => {
        console.log('Eliminar comentario:', id);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Autor', width: 150 },
        { field: 'content', headerName: 'Contenido', width: 300 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'postId', headerName: 'Post ID', width: 100 },
        {
            field: 'createdAt',
            headerName: 'Fecha de Creación',
            width: 200,
            valueFormatter: (params) => normalizeDate(params)
        },
        {
            field: 'status',
            headerName: 'Estado',
            width: 120,
            valueFormatter: (params) => params === 'ACTIVE' ? 'Activo' : 'Inactivo'
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 120,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleEdit(params.row.id)}>
                        <CheckIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <CloseIcon fontSize="small" color="error" />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={comments}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                disableSelectionOnClick
                getRowId={(row) => row.id}
            />
        </div>
    );
}