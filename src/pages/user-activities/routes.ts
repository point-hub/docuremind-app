export default {
  path: 'user-activities',
  children: [
    {
      path: '',
      component: () => import('@/pages/user-activities/list/index.vue'),
      meta: { requiresAuth: true }
    }
  ]
}
