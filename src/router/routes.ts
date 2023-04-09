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
        component: () => import('src/pages/requisition/UserManagement.vue'),
      },
      {
        path: 'cash',
        component: () => import('src/pages/requisition/cash/CashRequest.vue'),
      },
      {
        path: 'expense',
        component: () =>
          import('src/pages/requisition/expense/ExpensePage.vue'),
      },
      {
        path: 'expense/add-expense',
        component: () => import('src/pages/requisition/expense/AddExpense.vue'),
      },
      {
        path: 'vendor',
        component: () =>
          import('src/pages/requisition/vendor/VendorPayments.vue'),
      },
      {
        path: 'analytics',
        component: () => import('src/pages/requisition/AnalyticsPage.vue'),
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
