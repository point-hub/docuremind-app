import { createRouter, createWebHistory } from 'vue-router'

import authRoutes from '@/pages/auth/routes'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    authRoutes,
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('@/pages/403.vue')
    },
    {
      path: '/:catchAll(.*)', // This handles all unknown routes
      name: 'not-found',
      component: () => import('@/pages/404.vue')
    }
  ]
})

export default router
