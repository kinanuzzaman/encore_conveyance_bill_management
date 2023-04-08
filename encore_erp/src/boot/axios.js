import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $axios: AxiosInstance;
//   }
// }

const $api = axios.create({
  // baseURL: "http://localhost:3000/api",
  // baseURL: 'http://192.168.0.195:5000/api/v1',
  baseURL: 'https://encore-api-production.up.railway.app/api',
});

export default boot(({ app }) => {
  app.config.globalProperties.$api = $api;
});

export { $api };