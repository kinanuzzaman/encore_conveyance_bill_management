import { defineStore } from 'pinia';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';
import { $api } from '../boot/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userInfo: null,
    token: useLocalStorage('token', null, {
      serializer: StorageSerializers.string,
    }),
    userType: null,
    permissions: useLocalStorage('permissions', null, {
      serializer: StorageSerializers.string,
    }),
  }),
  getters: {
    getUserInfo: (state) => state.userInfo,
    getToken: (state) => state.token,
    getUserType: (state) => state.userType,
  },
  actions: {
    async UserLogin(payload: any): Promise<any> {
      const response = await $api.post('/users/login', payload);

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
    hasAccess(permission: string[]): boolean {
      console.log(
        '🚀 ~ file: auth.store.ts:37 ~ hasAccess ~ permission:',
        permission
      );
      const permissions = this.permissions;
      if (this.userType == 'SUPER_ADMIN' || 'DEVELOPER') return true;
      return permission?.some((perm: string) => permissions.includes(perm));
    },
    logout() {
      this.userInfo = null;
      this.token = null;
      this.userType = null;
    },
  },
});
