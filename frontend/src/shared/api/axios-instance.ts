import axios, {type AxiosInstance} from "axios";
import {tokenStorage} from "@/shared/api/token-storage.ts";

export const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})


apiClient.interceptors.request.use((config) => {
    const token = tokenStorage.get();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

let isRefreshing = false;

let queue: Array<(err: unknown) => void> = [];

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status !== 401 || originalRequest._retry) return Promise.reject(error);

        const authUrls = ["/auth/login", "/auth/register", "/auth/refresh"];
        if (authUrls.some((u) => originalRequest.url?.includes(u))) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                queue.push((err) => {
                    if (err) return reject(err);
                    else resolve(apiClient(originalRequest));
                })
            })
        }

        isRefreshing = true;

        try{
            const {data} = await apiClient.post("/auth/refresh");
            tokenStorage.set(data.access_token);
            isRefreshing = false;
            queue.forEach((cb) => cb(null));
            queue = [];
            return apiClient(originalRequest);
        } catch(refreshError){
            isRefreshing = false;
            queue.forEach((cb) => cb(refreshError));
            queue = [];
            tokenStorage.set(null);
            window.dispatchEvent(new CustomEvent<string>("auth:logout"));
            return Promise.reject(refreshError);
        }
    }
)