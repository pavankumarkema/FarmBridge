import axios from 'axios';

const rawBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? '/api' : 'https://farmbridge-g9x1.onrender.com/api');

const formatBaseUrl = (url) => {
  if (!url) return 'https://farmbridge-g9x1.onrender.com/api';
  const trimmed = url.replace(/\/+$/, '');
  if (trimmed.endsWith('/api') || trimmed === '/api') {
    return trimmed;
  }
  return `${trimmed}/api`;
};

const API_BASE_URL = formatBaseUrl(rawBaseUrl);

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('agriToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired — clear storage (AuthContext will handle state)
      localStorage.removeItem('agriToken');
    }
    return Promise.reject(error);
  }
);

export default api;
