import axios from 'axios';
import useAuthStore from '../store/authStore';

const axiosInstance = axios.create({
    baseURL: 'https://onlinejudge.duckdns.org',
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
            // Only redirect if not already on login page
            if (!window.location.pathname.includes('/login') && !window.location.pathname === '/') {
                useAuthStore.getState().logout();
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 