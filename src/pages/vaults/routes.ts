export default {
  path: 'vaults',
  children: [
    {
      path: '',
      component: () => import('@/pages/vaults/list/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'create',
      component: () => import('@/pages/vaults/create/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: ':id',
      component: () => import('@/pages/vaults/detail/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: ':id/edit',
      component: () => import('@/pages/vaults/edit/index.vue'),
      meta: { requiresAuth: true }
    }
  ]
}
