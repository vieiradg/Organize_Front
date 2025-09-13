import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  const publicRoutes = ['/auth/login', '/auth/register'];

  if (token && !publicRoutes.includes(config.url)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

export default api;