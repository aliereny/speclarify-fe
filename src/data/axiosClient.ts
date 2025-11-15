import axios from 'axios';
import {useAuthStore} from "@/stores/authStore";

export const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.speclarify.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = useAuthStore.getState().refreshToken;
            const response = await axiosClient.post('/refresh', {
                refresh_token: refreshToken,
            });
            if (response.status === 201) {
                useAuthStore.setState({
                    accessToken: response.data.access_token,
                });
                return axiosClient(originalRequest);
            }
        }
        return Promise.reject(error);
    },
);

axiosClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);
