import { defineStore } from 'pinia';
import { $api } from '../boot/axios';

// export const useCashStore = defineStore('cash', {
//   state: () => ({
//     users: [],
//     totalUsers: 0,
//   }),
//   getters: {
//     getAllUsers(state: any): any {
//       return state.users;
//     },
//     getTotalUsersCount(state: any): any {
//       return state.totalUsers;
//     },
//   },
//   actions: {
//     async fetchAllUsers(query: any): Promise<any> {
//       const response = await $api.get('/users', {
//         params: query,
//       });
//       this.users = response.data.data;
//       this.totalUsers = response.data.total;
//     },
//   },
// });
