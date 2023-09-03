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
            component: () => import('src/pages/users/UserManagement.vue'), meta: { requiresAuth: true, permission_required: ['user_read', 'user_write', 'user_create'] }
          },
          {
            path: 'profile',
            component: () => import('src/pages/users/userProfile.vue'), meta: { requiresAuth: true }
          },
          {
            path: 'client',
            children: [
              {
                path: '',
                component: () => import('src/pages/users/client/ClientManagement.vue'), meta: { requiresAuth: true, permission_required: ['user_read', 'user_write', 'user_create'] }
              },
              {
                path: 'pending',
                component: () => import('src/pages/users/client/PendingClientManagement.vue'), meta: { requiresAuth: true, permission_required: ['user_read', 'user_write', 'user_create'] }
              }
            ],
          },
          {
            path: 'vendor',
            children: [
              {
                path: '',
                component: () => import('src/pages/users/vendor/VendorManagement.vue'), meta: { requiresAuth: true, permission_required: ['user_read', 'user_write', 'user_create'] }
              },
              {
                path: 'pending',
                component: () => import('src/pages/users/vendor/PendingVendorManagement.vue'), meta: { requiresAuth: true, permission_required: ['user_read', 'user_write', 'user_create'] }
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
            component: () => import('src/pages/users/UsersRole.vue'), meta: { requiresAuth: true, permission_required: ['role_read', 'role_write', 'role_create'] }
          },
          {
            path: 'permission-table/:id',
            component: () => import('src/pages/users/UserPermissionTable.vue'), meta: { requiresAuth: true, permission_required: ['access_control'] }
          },
        ],
      },
      {
        path: 'cash',
        component: () => import('src/pages/requisition/cash/CashRequest.vue'), meta: { requiresAuth: true, permission_required: ['cash_read', 'cash_write', 'cash_create'] }
      },
      {
        path: 'cash/add-cash',
        component: () =>
          import('src/components/requisition/NewCashRequest.vue'), meta: { requiresAuth: true, permission_required: ['cash_write', 'cash_create'] }
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
        meta: { requiresAuth: true, permission_required: ['expense_write', 'expense_create'] }
      },
      {
        path: 'attendance',
        component: () =>
          import('src/pages/analytics/attendance/AttendancePage.vue'), meta: { requiresAuth: true, permission_required: ['attendance_analytics'] }
      },
      {
        path: 'user-analytics',
        component: () => import('src/pages/analytics/user/UserAnalytics.vue'), meta: { requiresAuth: true, permission_required: ['user_analytics'] }
      },
      {
        path: 'projects',
        component: () => import('src/pages/projects/AllProjects.vue'), meta: { requiresAuth: true, permission_required: ['project_read', 'project_write', 'project_create'] }
      },
      {
        path: 'projects/add-project',
        component: () => import('src/pages/projects/AddProject.vue'), meta: { requiresAuth: true, permission_required: ['project_write', 'project_create'] }
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
