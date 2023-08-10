import { route } from 'quasar/wrappers';
import JwtDecode from 'jwt-decode';
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router';
import routes from './routes';
import { useAuthStore } from "src/stores/auth.store"

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
    if (to.meta.requiresAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded: any = JwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          next('/');
        } else {
          next();
          // const authStore = useAuthStore();
          // console.log(authStore.hasAccess(to.meta.permission_required));
          // console.log(to.meta);


          // if (authStore.hasAccess(to.meta.permission_required)) {
          //   next()
          // } else {
          //   next('/403')
          // }
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
