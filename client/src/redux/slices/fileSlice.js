import { createSlice } from '@reduxjs/toolkit';

const fileSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    searchResults: [],
    loading: false,
    error: null,
    currentFile: null,
  },
  reducers: {
    // Add all your reducers here
    uploadStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    uploadSuccess: (state, action) => {
      state.files.unshift(action.payload);
      state.loading = false;
    },
    // ... include all other reducers
  }
});

// Export actions
export const { 
  uploadStart,
  uploadSuccess,
  uploadFailure,
  getFilesStart,
  getFilesSuccess,
  getFilesFailure,
  searchFilesStart,
  searchFilesSuccess,
  searchFilesFailure,
  getFileStart,
  getFileSuccess,
  getFileFailure,
  deleteFileStart,
  deleteFileSuccess,
  deleteFileFailure,
  clearFiles,
  clearError
} = fileSlice.actions;

// Export async thunks
export const uploadFile = (fileData) => async (dispatch) => {
  try {
    dispatch(uploadStart());
    // Your upload logic
    // Example: replace with your actual API call
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: fileData,
    });
    const data = await response.json();
    dispatch(uploadSuccess(data));
  } catch (error) {
    dispatch(uploadFailure(error.message));
  }
};

export const getFiles = () => async (dispatch) => {
  try {
    dispatch(getFilesStart());
    // Your get files logic
    // Example: replace with your actual API call
    const response = await fetch('/api/files');
    const data = await response.json();
    dispatch(getFilesSuccess(data));
  } catch (error) {
    dispatch(getFilesFailure(error.message));
  }
};

// Add similar thunks for searchFiles, deleteFile etc.

export default fileSlice.reducer;