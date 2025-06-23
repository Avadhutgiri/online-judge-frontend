import axios from 'axios';
import useAuthStore from '../store/authStore';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://onlinejudge.duckdns.org',
    // baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Ensure credentials are included in every request
        config.withCredentials = true;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Only redirect if not on login, register, or registerTeam pages
            const currentPath = window.location.pathname;
            if (!currentPath.includes('/login') && 
                currentPath !== '/' && 
                currentPath !== '/register' && 
                currentPath !== '/registerTeam') {
                useAuthStore.getState().logout();
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 