import { createRouter, createWebHistory } from 'vue-router'

import authRoutes from '@/pages/auth/routes'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/app.vue'),
      children: [
        { path: '', redirect: '/home' },
        { path: 'home', component: () => import('@/pages/home.vue') },
        { path: 'users', component: () => import('@/pages/home.vue') },
        { path: 'owners', component: () => import('@/pages/home.vue') },
        { path: 'vaults', component: () => import('@/pages/home.vue') },
        { path: 'documents', component: () => import('@/pages/home.vue') }
      ]
    },
    authRoutes,
    { path: '/unauthorized', name: 'unauthorized', component: () => import('@/pages/403.vue') },
    {
      path: '/:catchAll(.*)', // This handles all unknown routes
      name: 'not-found',
      component: () => import('@/pages/404.vue')
    }
  ]
})

export default router
