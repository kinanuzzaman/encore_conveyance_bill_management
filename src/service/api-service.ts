import { $api } from '../boot/axios';
import { AuthChecker } from '../helpers/authGuard.decorator';

@AuthChecker()
export class ApiService {
  constructor() {
    // $api.interceptors.request.use((config) => {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
    //   return config;
    // });
  }
  async post(url: string, payload: any, config?: any) {
    return $api.post(url, payload, config);
  }
  async patch(url: string, payload: any, config?: any) {
    return $api.patch(url, payload, config);
  }
  async get(url: string, config?: any) {
    return $api.get(url, config);
  }
  async put(url: string, payload: any, config?: any) {
    return $api.put(url, payload, config);
  }
  async delete(url: string, config?: any) {
    return $api.delete(url, config);
  }
}
