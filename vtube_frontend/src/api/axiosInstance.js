import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach JWT token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle global success, messages, and errors
axiosInstance.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data;

    // Show toast message if success is true and message exists
    if (success && message) {
      toast.success(message);
    }

    // Return the nested data to the caller
    return data;
  },
  (error) => {
    const response = error.response;
    const message = response?.data?.message || 'Something went wrong';

    // Handle 401 Unauthorized: Logout and redirect
    if (response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      
      toast.error('Session expired. Please login again.');
      
      // Redirect if window is available
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    } else {
      // Show error toast for other failures
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
