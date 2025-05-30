import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteFileStart } from '../redux/slices/fileSlice';

const FilePreview = ({ file, onDelete }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteFileStart(file._id));
    if (onDelete) onDelete();
  };

  const renderPreview = () => {
    if (file.format === 'pdf') {
      return (
        <iframe
          src={file.url}
          title={file.name}
          width="100%"
          height="400px"
          style={{ border: 'none' }}
        />
      );
    } else if (file.format.startsWith('image')) {
      return (
        <CardMedia
          component="img"
          image={file.url}
          alt={file.name}
          height="400"
          style={{ objectFit: 'contain' }}
        />
      );
    } else if (file.format.startsWith('video')) {
      return (
        <CardMedia
          component="video"
          src={file.url}
          title={file.name}
          controls
          height="400"
          style={{ objectFit: 'contain' }}
        />
      );
    } else if (file.format.startsWith('audio')) {
      return (
        <CardMedia
          component="audio"
          src={file.url}
          title={file.name}
          controls
          style={{ width: '100%' }}
        />
      );
    } else {
      return (
        <Typography variant="body2" color="text.secondary">
          Preview not available
        </Typography>
      );
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      {renderPreview()}
      <CardContent>
        <Typography variant="h6">{file.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {file.format.toUpperCase()} • {Math.round(file.size / 1024)} KB •{' '}
          {new Date(file.uploadedAt).toLocaleDateString()} • {file.views} views
        </Typography>
        {file.tags && file.tags.length > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Tags: {file.tags.join(', ')}
          </Typography>
        )}
        <IconButton
          aria-label="delete"
          onClick={handleDelete}
          sx={{ mt: 1 }}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default FilePreview;