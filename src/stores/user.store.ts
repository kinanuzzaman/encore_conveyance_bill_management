import { defineStore } from 'pinia';
import { ApiService } from '../service/api-service';

const apiService = new ApiService();
export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    totalUsers: 0,
  }),
  getters: {
    getAllUsers(state: any): any {
      return state.users;
    },
    getTotalUsersCount(state: any): any {
      return state.totalUsers;
    },
  },
  actions: {
    async fetchAllUsers(query: any): Promise<any> {
      const response = await apiService.get('/users', {
        params: query,
      });
      this.users = response?.data.data;
      this.totalUsers = response?.data.total;
    },
    async usersRegister(payload: any) {
      await $api.post('/users/invite-user', { param: payload });
    },
  },
});
