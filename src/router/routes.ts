const routes = [
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } }],
  },
  {
    path: '/403',
    component: () => import('src/pages/ForbiddenPage.vue'),
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
        children: [
          {
            path: '',
            component: () => import('src/pages/users/UserManagement.vue'), meta: { requiresAuth: true }
          },
          {
            path: 'client',
            children: [
              {
                path: '',
                component: () => import('src/pages/users/client/ClientManagement.vue'), meta: { requiresAuth: true }
              },
              {
                path: 'pending',
                component: () => import('src/pages/users/client/PendingClientManagement.vue'), meta: { requiresAuth: true }
              }
            ],
          },
          {
            path: 'vendor',
            children: [
              {
                path: '',
                component: () => import('src/pages/users/vendor/VendorManagement.vue'), meta: { requiresAuth: true }
              },
              {
                path: 'pending',
                component: () => import('src/pages/users/vendor/PendingVendorManagement.vue'), meta: { requiresAuth: true }
              }
            ],
          },
        ],
      },
      {
        path: 'role',
        children: [
          {
            path: '',
            component: () => import('src/pages/users/UsersRole.vue'), meta: { requiresAuth: true }
          },
          {
            path: 'permission-table/:id',
            component: () => import('src/pages/users/UserPermissionTable.vue'), meta: { requiresAuth: true }
          },
        ],
      },
      {
        path: 'cash',
        component: () => import('src/pages/requisition/cash/CashRequest.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'cash/add-cash',
        component: () =>
          import('src/components/requisition/NewCashRequest.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'expense',
        component: () =>
          import('src/pages/requisition/expense/ExpensePage.vue'),
        meta: { requiresAuth: true, permission_required: ['expense_read', 'expense_write', 'expense_create'] }
      },
      {
        path: 'expense/add-expense',
        component: () => import('src/pages/requisition/expense/AddExpense.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'vendor',
        component: () =>
          import('src/pages/requisition/vendor/VendorPayments.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'vendor/add-vendor',
        component: () => import('src/pages/requisition/vendor/AddVendor.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'attendance',
        component: () =>
          import('src/pages/analytics/attendance/AttendancePage.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'attendance/add-attendance',
        component: () =>
          import('src/pages/analytics/attendance/AttendancePage.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'user-analytics',
        component: () => import('src/pages/analytics/user/UserAnalytics.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'analytics',
        component: () => import('src/pages/requisition/AnalyticsPage.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'projects',
        component: () => import('src/pages/projects/AllProjects.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'projects/add-project',
        component: () => import('src/pages/projects/AddProject.vue'), meta: { requiresAuth: true }
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
