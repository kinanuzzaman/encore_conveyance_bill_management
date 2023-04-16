import JwtDecode from 'jwt-decode';
import { useAuthStore } from '../stores/auth.store';
import { $api } from 'src/boot/axios';

const { token } = useAuthStore();

export function AuthChecker() {
  return function (target: any) {
    const originalMethods = Object.getOwnPropertyDescriptors(target.prototype);
    Object.keys(originalMethods).forEach((methodName) => {
      const method = originalMethods[methodName].value;

      if (methodName !== 'constructor' && typeof method === 'function') {
        Object.defineProperty(target.prototype, methodName, {
          value: function (...args: any) {
            // const userToken = localStorage.getItem('token');
            //! have to remove
            // console.log(userToken);
            // console.log(
            //   '🚀 ~ file: authGuard.decorator.ts:21 ~ Object.keys ~ token:',
            //   token
            // );
            if (token) {
              const decoded: any = JwtDecode(token);
              if (decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                location.href = '/login';
              } else {
                $api.interceptors.request.use((config) => {
                  config.headers.Authorization = `Bearer ${token}`;
                  return config;
                });
              }
            }
            return method.apply(this, args);
          },
        });
      }
    });
  };
}
