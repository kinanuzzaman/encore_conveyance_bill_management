import { defineStore } from 'pinia';
import { useAuthStore } from './auth.store';
import { useLocalStorage, StorageSerializers } from '@vueuse/core';
import { $api } from '../boot/axios';

export const useAttendanceStore = defineStore('attendance', {
  state: () => ({
    token: useAuthStore().token,
    user_location: null,
    activeAttendance: null,
  }),
  getters: {},
  actions: {
    async startAttendance(payload: any): Promise<any> {
      const response = await $api.post('/attendance/check-in', payload, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data;
    },
    async endAttendance(payload: any): Promise<any> {
      const response = await $api.post('/attendance/check-out', payload, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return response.data;
    },
    async getAttendanceStatus(): Promise<any> {
      const response = await $api.get('/attendance/status', {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      this.activeAttendance = response.data.data ? response.data.data : null;
    },
  },
});
