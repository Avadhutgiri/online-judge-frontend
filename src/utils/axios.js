import axios from 'axios';

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
            // Redirect to login page on authentication errors
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 