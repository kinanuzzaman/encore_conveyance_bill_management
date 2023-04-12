import { defineStore } from 'pinia';
import { ApiService } from '../service/api-service';
const apiService = new ApiService();
export const useRbacStore = defineStore('rbac', {
  state: () => ({
    roles: [],
    //  totalUsers: 0,
  }),
  getters: {
    getAllRoles(state: any): any {
      return state.roles.map((role: any) => {
        return {
          label: role.role_name,
          value: role._id,
        };
      });
    },
    // getTotalUsersCount(state: any): any {
    //   return state.totalUsers;
    // },
  },
  actions: {
    async fetchAllRoles(): Promise<any> {
      const response = await apiService.get('/rbac/roles');
      this.roles = response?.data.data;
      console.log(this.roles);
    },
    // async userInvite(payload: any) {
    //   await apiService.post('/users/invite-user', { param: payload });
    // },
  },
});
