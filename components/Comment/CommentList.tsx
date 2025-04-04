import React from 'react';
import {
    Box,
    Typography,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Paper
} from '@mui/material';
import { normalizeDate } from '@/utils/date'
import { Comment } from '@/types/comment'


type Props = {
    comments: Comment[]
}

export default function CommentList({ comments }: Props) {


    return (
        <Paper elevation={0} sx={{ mt: 4, p: 2, bgcolor: 'background.paper' }}>
            <Typography variant="h6" gutterBottom>
                Comentarios ({comments.length})
            </Typography>

            <List sx={{ width: '100%' }}>
                {comments.map((comment) => (
                    <React.Fragment key={comment.id}>
                        <ListItem alignItems="flex-start">

                            <ListItemAvatar>
                                <Avatar
                                    alt={comment.author.name || 'Usuario'}
                                    src={comment.author.avatar || ''} // Asume que tu modelo User tiene campo 'image'
                                    sx={{ bgcolor: getRandomColor() }} // Función opcional para colores
                                />
                            </ListItemAvatar>


                            <ListItemText
                                primary={
                                    <>
                                        <Typography
                                            component="span"
                                            fontWeight="bold"
                                            sx={{ display: 'inline' }}
                                        >
                                            {comment.author.name || 'Anónimo'}
                                        </Typography>
                                        <Typography
                                            component="span"
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ ml: 1 }}
                                        >
                                            {normalizeDate(comment.createdAt)}
                                        </Typography>
                                    </>
                                }
                                secondary={
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {comment.content}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
};

// Función auxiliar para colores de avatar aleatorios
const getRandomColor = () => {
    const colors = [
        '#ff5722', '#2196f3', '#4caf50', '#ff9800', '#9c27b0'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

