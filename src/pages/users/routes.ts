export default {
  path: 'users',
  children: [
    {
      path: '',
      component: () => import('@/pages/users/list/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'create',
      component: () => import('@/pages/users/create/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: ':id',
      component: () => import('@/pages/users/detail/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: ':id/edit',
      component: () => import('@/pages/users/edit/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'profile',
      component: () => import('@/pages/users/profile/index.vue'),
      meta: { requiresAuth: true }
    }
  ]
}
