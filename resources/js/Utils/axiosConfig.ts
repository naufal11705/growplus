import axios from "axios";
import { getCsrfToken } from "@/Utils/csrfToken";

const axiosInstance = axios.create({
    baseURL : '/',
    headers: {
        'X-CSRF-TOKEN': getCsrfToken(),
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    }
});

axiosInstance.interceptors.request.use((config) => {
    console.log('Request dikirim ke : ', config.url);
    return config;
});

export default axiosInstance;