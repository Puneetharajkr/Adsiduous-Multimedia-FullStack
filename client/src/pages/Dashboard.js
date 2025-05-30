import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../redux/slices/fileSlice';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  CircularProgress,
} from '@mui/material';
import FileUpload from '../components/FileUpload';
import FilePreview from '../components/FilePreview';
import SearchBar from '../components/SearchBar';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { files, searchResults, loading } = useSelector((state) => state.files);
  const navigate = useNavigate();
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    dispatch(getFiles());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const displayFiles = showSearchResults ? searchResults : files;

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 4 }}>
        <Typography variant="h4">Welcome, {user?.name}</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <FileUpload />

      <SearchBar
        onSearch={() => setShowSearchResults(true)}
        onClear={() => setShowSearchResults(false)}
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {displayFiles?.length > 0 ? (
            displayFiles.map((file) => (
              <Grid item xs={12} sm={6} md={4} key={file._id}>
                <FilePreview file={file} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                No files found. Upload some files to get started!
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;