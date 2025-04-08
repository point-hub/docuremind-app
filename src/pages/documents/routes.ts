export default {
  path: 'documents',
  children: [
    {
      path: '',
      component: () => import('@/pages/documents/list/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'create',
      component: () => import('@/pages/documents/create/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: ':id',
      component: () => import('@/pages/documents/detail/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: ':id/edit',
      component: () => import('@/pages/documents/edit/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: ':id/borrow',
      component: () => import('@/pages/documents/borrow/index.vue'),
      meta: { requiresAuth: true }
    }
  ]
}
