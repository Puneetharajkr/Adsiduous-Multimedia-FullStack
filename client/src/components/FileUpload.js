import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../redux/slices/fileSlice';
import { Button, Box, Typography, LinearProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUpload = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState('');
  const [uploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    if (tags) {
      formData.append('tags', tags);
    }

    dispatch(uploadFile(formData));
    setFile(null);
    setTags('');
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Upload a File
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
          >
            Choose File
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept="image/*,video/*,audio/*,application/pdf"
            />
          </Button>
          {file && (
            <Typography variant="body2">
              Selected: {file.name} ({Math.round(file.size / 1024)} KB)
            </Typography>
          )}
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            style={{ padding: '8px' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!file}
          >
            Upload
          </Button>
        </Box>
      </form>
      {uploadProgress > 0 && uploadProgress < 100 && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Typography variant="body2" align="center">
            {uploadProgress}%
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;