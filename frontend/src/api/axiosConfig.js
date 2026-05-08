import axios from 'axios';

// Base URL is driven by the VITE_API_BASE_URL environment variable.
// For local dev set it in .env; for Vercel set it in the project's
// Environment Variables settings (pointing to your deployed backend).
const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/v1`,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
