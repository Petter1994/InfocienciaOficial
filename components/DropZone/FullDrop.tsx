'use client';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Box, 
  Button, 
  LinearProgress, 
  Typography,
  Avatar,
  ListItem,
  ListItemText,
  IconButton 
} from '@mui/material';
import { CloudUpload, Delete } from '@mui/icons-material';

export default function FullDrop({ onUpload, isUploading }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg'] },
    maxFiles: 1,
    multiple: false,
    maxSize: 3 * 1024 * 1024
  });

  const handleUpload = async () => {
    if (!file) return;

    try {
      setProgress(30); // Progress inicial
      const url = await onUpload(file); // Llama a la función del padre
      setProgress(100);
      setTimeout(() => setProgress(0), 1000); // Reset después de 1seg
    } catch (error) {
      setProgress(0);
      alert(`Error: ${error.message}`);
    }
  };

  const removeFile = () => {
    if (file) {
      URL.revokeObjectURL(file.preview);
      setFile(null);
    }
  };

  return (
    <Box sx={{ p: 3, border: '1px dashed #ccc', borderRadius: 2, maxWidth: 500 }}>
      {/* Área de Dropzone */}
      <Box {...getRootProps()} sx={{ /* ... (estilos iguales) */ }}>
        <input {...getInputProps()} />
        <CloudUpload sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
        <Typography>
          {isDragActive ? 'Suelta la imagen aquí' : 'Arrastra una imagen o haz clic'}
        </Typography>
      </Box>

      {/* Previsualización */}
      {file && (
        <Box sx={{ my: 2 }}>
          <ListItem
            secondaryAction={
              <IconButton onClick={removeFile}>
                <Delete color="error" />
              </IconButton>
            }
          >
            <Avatar src={file.preview} variant="rounded" sx={{ mr: 2 }} />
            <ListItemText
              primary={file.name}
              secondary={`${(file.size / 1024).toFixed(1)} KB`}
            />
          </ListItem>
        </Box>
      )}

      {/* Barra de progreso */}
      {progress > 0 && (
        <Box sx={{ mb: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="caption" display="block" textAlign="center">
            {progress}% completado
          </Typography>
        </Box>
      )}

      {/* Botón controlado por el padre */}
      <Button
        fullWidth
        variant="contained"
        onClick={handleUpload}
        disabled={!file || isUploading}
        startIcon={<CloudUpload />}
      >
        {isUploading ? 'Subiendo...' : 'Subir imagen'}
      </Button>
    </Box>
  );
}