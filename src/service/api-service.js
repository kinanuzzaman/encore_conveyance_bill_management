import { $api } from '../boot/axios';

export class ApiService {
    constructor() {
        $api.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }
    async post(url, payload, config) {
        return $api.post(url, payload, config);
    }
    async get(url, config) {
        return $api.get(url, config);
    }
    async put(url, payload, config) {
        return $api.put(url, payload, config);
    }
    async delete(url, config) {
        return $api.delete(url, config);
    }
}