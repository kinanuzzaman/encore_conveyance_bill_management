import { defineStore } from 'pinia';
import { ApiService } from '../service/api-service';
const apiService = new ApiService();
export const useRbacStore = defineStore('rbac', {
  state: () => ({
    roles: [],
    permissions: [],
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
    getRolesList(state: any): any {
      return state.roles;
    },
    getAllPermissions(state: any): any {
      return state.permissions.map((permission: any) => {
        return {
          label: permission.perm_name,
          value: permission._id,
        };
      });
    },
  },
  actions: {
    async fetchAllRoles(): Promise<any> {
      const response = await apiService.get('/rbac/roles');
      this.roles = response?.data.data;
      console.log(this.roles);
    },
    async fetchPermissions() {
      const response = await apiService.get('/rbac/permissions');
      this.permissions = response?.data.data;
      console.log(this.permissions);
    },
    // async userInvite(payload: any) {
    //   await apiService.post('/users/invite-user', { param: payload });
    // },
  },
});
