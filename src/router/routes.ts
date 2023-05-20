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
      {
        path: 'accept-invitation/:id',
        component: () => import('pages/OnBoard.vue'),
      },
    ],
  },

  //User Management
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'user',
        component: () => import('src/pages/users/UserManagement.vue'),
      },
      {
        path: 'role',
        component: () => import('src/pages/users/UsersRole.vue'),
      },
      {
        path: 'cash',
        component: () => import('src/pages/requisition/cash/CashRequest.vue'),
      },
      {
        path: 'cash/add-cash',
        component: () =>
          import('src/components/requisition/NewCashRequest.vue'),
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
        path: 'vendor/add-vendor',
        component: () => import('src/pages/requisition/vendor/AddVendor.vue'),
      },
      {
        path: 'attendance',
        component: () =>
          import('src/pages/analytics/attendance/AttendancePage.vue'),
      },
      {
        path: 'attendance/add-attendance',
        component: () =>
          import('src/pages/analytics/attendance/AttendancePage.vue'),
      },
      {
        path: 'user-analytics',
        component: () => import('src/pages/analytics/user/UserAnalytics.vue'),
      },
      {
        path: 'analytics',
        component: () => import('src/pages/requisition/AnalyticsPage.vue'),
      },
      {
        path: 'projects',
        component: () => import('src/pages/projects/AllProjects.vue'),
      },
      {
        path: 'projects/add-project',
        component: () => import('src/pages/projects/AddProject.vue'),
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
