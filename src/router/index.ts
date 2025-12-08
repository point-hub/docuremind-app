import { createRouter, createWebHistory } from 'vue-router'

import axios from '@/axios'
import authRoutes from '@/pages/auth/routes'
import documentRoutes from '@/pages/documents/routes'
import ownerRoutes from '@/pages/owners/routes'
import userActivityRoutes from '@/pages/user-activities/routes'
import userRoutes from '@/pages/users/routes'
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
        {
          path: 'home',
          component: () => import('@/pages/home/index.vue'),
          meta: { requiresAuth: true }
        },
        vaultRoutes,
        userRoutes,
        userActivityRoutes,
        documentRoutes,
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
        email: response.data.email,
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
