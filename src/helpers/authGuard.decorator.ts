import JwtDecode from 'jwt-decode';
// import { useAuthStore } from '../stores/auth.store';
import { $api } from 'src/boot/axios';

// const { token } = useAuthStore();

export function AuthChecker() {
  return function (target: any) {
    const originalMethods = Object.getOwnPropertyDescriptors(target.prototype);
    Object.keys(originalMethods).forEach((methodName) => {
      const method = originalMethods[methodName].value;

      if (methodName !== 'constructor' && typeof method === 'function') {
        Object.defineProperty(target.prototype, methodName, {
          value: function (...args: any) {
            const userToken = localStorage.getItem('token');
            //! have to remove
            // console.log(userToken);
            // console.log(
            //   '🚀 ~ file: authGuard.decorator.ts:21 ~ Object.keys ~ token:',
            //   token
            // );
            if (userToken) {
              const decoded: any = JwtDecode(userToken);
              if (decoded.exp * 1000 < Date.now()) {
                localStorage.clear();
                localStorage.removeItem('token');
                localStorage.removeItem('userInfo');
                localStorage.removeItem('userRole');
                localStorage.removeItem('userType');
                localStorage.removeItem('root');
                localStorage.removeItem('permissions');
                location.href = '/';
              } else {
                $api.interceptors.request.use((config) => {
                  config.headers.Authorization = `Bearer ${userToken}`;
                  return config;
                });
              }
            } else {
              location.href = '/';
            }
            return method.apply(this, args);
          },
        });
      }
    });
  };
}
