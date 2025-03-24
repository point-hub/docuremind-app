export default {
  path: 'owners',
  children: [
    {
      path: '',
      component: () => import('@/pages/owners/list/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'create',
      component: () => import('@/pages/owners/create/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: ':id',
      component: () => import('@/pages/owners/detail/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: ':id/edit',
      component: () => import('@/pages/owners/edit/index.vue'),
      meta: { requiresAuth: true }
    }
  ]
}
