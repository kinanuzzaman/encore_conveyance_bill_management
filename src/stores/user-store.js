import { defineStore } from 'pinia';
import { ApiService } from 'src/service/api-service';

const apiService = new ApiService();
export const useUserStore = defineStore('counter', {
    state: () => ({
        counter: 0,
    }),
    getters: {
        doubleCount: (state) => state.counter * 2,
    },
    actions: {
        userRegister: async (payload) => {
            await apiService.post('/users/register', payload);
            return true;
        },
        userLogin: async (payload) => {
            await apiService.post('/users/login', payload);
            return true;
        },
        fetchAllUsers: async () => {
            await apiService.get('/users');
            return true;
        }
    },
});
