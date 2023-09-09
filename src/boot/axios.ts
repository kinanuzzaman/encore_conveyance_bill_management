import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const $api = axios.create({
  baseURL: 'http://localhost:8000/api',
  // baseURL: 'http://192.168.0.195:5000/api/v1',
  // baseURL: 'https://brain.encore.com.bd/api',
});

export default boot(({ app }) => {
  app.config.globalProperties.$api = $api;
});

export { $api };
