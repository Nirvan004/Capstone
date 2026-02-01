import axios from 'axios';
import { getToken } from '../context/AuthContext';

const apiClient = axios.create({
  baseURL: 'http://localhost:8008/api',
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;