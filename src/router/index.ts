import { createRouter, createWebHistory } from 'vue-router'

import axios from '@/axios'
import authRoutes from '@/pages/auth/routes'
import ownerRoutes from '@/pages/owners/routes'
import vaultRoutes from '@/pages/vaults/routes'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/app.vue'),
      children: [
        { path: '', redirect: '/home' },
        { path: 'home', component: () => import('@/pages/home.vue'), meta: { requiresAuth: true } },
        {
          path: 'users',
          component: () => import('@/pages/home.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'documents',
          component: () => import('@/pages/home.vue'),
          meta: { requiresAuth: true }
        },
        vaultRoutes,
        ownerRoutes
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

const isAuthenticated = async () => {
  try {
    const authStore = useAuthStore()
    const response = await axios.post('/v1/auth/verify-token')
    if (response.status === 200) {
      authStore.update({
        _id: response.data._id,
        name: response.data.username,
        role: response.data.role
      })
      return true
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false
  }
}

router.beforeEach(async (to, from, next) => {
  // 1. check if client is authenticated
  if (to.meta.requiresAuth && !(await isAuthenticated())) {
    // err 1. redirect to signin page if not authenticated
    next(`/signin?${new URLSearchParams(to.query as Record<string, string>).toString()}`)
  } else {
    next()
  }
})

export default router
