import { route } from 'quasar/wrappers';
import JwtDecode from 'jwt-decode';
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router';
import routes from './routes';

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: [
      ...routes,
      {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
      },
    ],
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    // if (to.path === '/') {
    //   console.log('🚀 ~ file: index.ts:35 ~ Router.beforeEach ~ from:', from);
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     const decoded: any = JwtDecode(token);
    //     if (decoded.exp * 1000 < Date.now()) {
    //       localStorage.removeItem('token');
    //     } else {
    //       next(from.path);
    //     }
    //   }
    // }
    if (to.meta.requiresAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded: any = JwtDecode(token);
        console.log(
          '🚀 decoded.exp * 1000 < Date.now()',
          decoded.exp * 1000 < Date.now()
        );
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          next('/');
        } else {
          next();
        }
      } else {
        if (to.path === '/') {
          next();
        } else {
          next('/');
        }
      }
    } else {
      next();
    }
  });

  return Router;
});
