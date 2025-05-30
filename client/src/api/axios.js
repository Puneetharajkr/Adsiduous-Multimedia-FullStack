import axios from 'axios';
import { store } from '../redux/store';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      store.dispatch({ type: 'auth/logout' });
    }
    return Promise.reject(error);
  }
);

export default api;