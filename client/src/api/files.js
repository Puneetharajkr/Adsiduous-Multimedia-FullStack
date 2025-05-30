import api from './axios';

export const uploadFile = async (fileData) => {
  const formData = new FormData();
  formData.append('file', fileData.file);
  if (fileData.tags) {
    formData.append('tags', fileData.tags);
  }

  const response = await api.post('/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getFiles = async () => {
  const response = await api.get('/files');
  return response.data;
};

export const searchFiles = async (query) => {
  const response = await api.get(`/files/search?query=${query}`);
  return response.data;
};

export const getFile = async (id) => {
  const response = await api.get(`/files/${id}`);
  return response.data;
};

export const deleteFile = async (id) => {
  const response = await api.delete(`/files/${id}`);
  return response.data;
};