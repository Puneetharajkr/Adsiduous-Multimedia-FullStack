import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchFilesStart } from '../redux/slices/fileSlice';
import { TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchFilesStart(query));
    }
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search files by name or tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;