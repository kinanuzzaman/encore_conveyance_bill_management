import { defineStore } from 'pinia';
import { $api } from '../boot/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userInfo: null,
    token: null,
    userType: null,
    permissions: null,
  }),
  getters: {
    getUserInfo: (state) => state.userInfo,
    getToken: (state) => state.token,
    getUserType: (state) => state.userType,
  },
  actions: {
    async UserLogin(payload: any): Promise<any> {
      const response = await $api.post('/users/login', payload);
      console.log(
        '🚀 ~ file: auth.store.ts:19 ~ UserLogin ~ response:',
        response
      );
      this.userInfo = response.data.data;
      this.userType = response.data.data.user_type;
      this.token = response.data.data.token;
      this.permissions = response.data.data.permissions;
    },
    async InviteNewUser(payload: any): Promise<any> {
      const response = await $api.post('/users/invite-user', payload, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data;
    },
    hasAccess(state: any): any {
      return (permission: string[]): boolean => {
        const permissions = state.permissions;
        return permission.some((perm: string) => permissions.includes(perm));
      };
    },
    logout() {
      this.userInfo = null;
      this.token = null;
      this.userType = null;
    },
  },
});
