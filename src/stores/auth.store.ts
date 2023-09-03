import { defineStore } from 'pinia';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';
import { $api } from '../boot/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userInfo: useLocalStorage('userInfo', null, {
      serializer: StorageSerializers.object,
    }),
    token: useLocalStorage('token', null, {
      serializer: StorageSerializers.string,
    }),
    userType: useLocalStorage('userType', null, {
      serializer: StorageSerializers.string,
    }),
    userRole: useLocalStorage('userRole', null, {
      serializer: StorageSerializers.object,
    }),
    permissions: useLocalStorage('permissions', null, {
      serializer: StorageSerializers.string,
    }),
  }),
  getters: {
    getUserInfo: (state) => state.userInfo,
    getToken: (state) => state.token,
    getUserType: (state) => state.userType,
    getUserRoleName: (state) => state.userRole.role_name,
  },
  actions: {
    updateUserInfo(payload: any) {
      console.log("🚀 ~ file: auth.store.ts:31 ~ updateUserInfo ~ payload:", payload)
      this.userInfo = payload;
    },
    async UserLogin(payload: any): Promise<any> {
      const response = await $api.post('/users/login', payload);

      this.userInfo = response.data.data;
      this.userType = response.data.data.user_type;
      this.userRole = response.data.data.role;
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
    hasAccess(permission: any): boolean {
      const permissions = this.permissions;
      // if (this.userRole.role_name == 'super_admin') return true;
      return permission?.some((perm: string) => permissions.includes(perm));
    },
    canAccess(permission: string): boolean {
      const permissions = this.permissions;
      // if (this.userRole == 'super_admin') return true;
      return permissions.includes(permission);
    },
    logout() {
      this.userInfo = null;
      this.token = null;
      this.userRole = null;
      this.userType = null;
    },
  },
});
