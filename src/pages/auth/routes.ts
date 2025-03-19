export default {
  path: '/',
  component: () => import('@/layouts/auth.vue'),
  children: [
    {
      path: '',
      redirect: 'signin'
    },
    {
      path: 'signin',
      component: () => import('@/pages/auth/signin/index.vue')
    },
    {
      path: 'signup',
      component: () => import('@/pages/auth/signup/index.vue')
    },
    {
      path: 'verify-email',
      component: () => import('@/pages/auth/verify-email/index.vue')
    },
    {
      path: 'forgot-password',
      component: () => import('@/pages/auth/forgot-password/index.vue')
    },
    {
      path: 'reset-password',
      component: () => import('@/pages/auth/reset-password/index.vue')
    }
  ]
}
