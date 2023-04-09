const routes = [
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  //Login
  {
    path: '/',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { path: '', component: () => import('pages/login/LoginPage.vue') },
      {
        path: 'forgotpass',
        component: () => import('pages/login/ForgotPass.vue'),
      },
      { path: 'newpass', component: () => import('pages/login/NewPass.vue') },
    ],
  },

  //User Management
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'user',
        component: () => import('src/pages/conveyance/UserManagement.vue'),
      },
      {
        path: 'cash',
        component: () => import('src/pages/conveyance/CashRequest.vue'),
      },
      {
        path: 'expense',
        component: () => import('src/pages/conveyance/ExpensePage.vue'),
      },
      {
        path: 'analytics',
        component: () => import('src/pages/conveyance/AnalyticsPage.vue'),
      },
    ],
  },
  {
    path: '/expense',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'add-expense',
        component: () => import('src/pages/expense/AddExpense.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
