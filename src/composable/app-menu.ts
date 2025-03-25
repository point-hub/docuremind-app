import { ref, watch } from 'vue'

import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

export function useAppMenu() {
  const menus = ref<IApps[]>([
    {
      name: 'DocuRemind',
      path: '/',
      icon: 'https://assets.pointhub.net/assets/images/logo/primary/icon-rounded.png'
    }
  ])

  watch(
    () => authStore.role,
    () => {
      menus.value[0].menu = [{ name: 'Home', path: '/home' }]
      menus.value[0].menu?.push(...seedMenu())
    },
    {
      immediate: true
    }
  )

  return { menus }
}

const seedMenu = () => {
  const menu = ref<IMenu[]>([])

  if (authStore?.role === 'admin') {
    menu.value.push({ name: 'Users', path: '/users' })
    menu.value.push({ name: 'Vaults', path: '/vaults' })
    menu.value.push({ name: 'Owners', path: '/owners' })
  }
  menu.value.push({ name: 'Documents', path: '/documents' })

  return menu.value
}
