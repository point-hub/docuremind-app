<script setup lang="ts">
import { useDarkMode, useSidebarStore } from '@point-hub/papp'
import VueCookie from '@point-hub/vue-cookie'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

const { isDarkMode, toggleDarkMode } = useDarkMode()
const sidebarStore = useSidebarStore()
const router = useRouter()

const accountPopoverRef = ref()
const authStore = useAuthStore()

const onSignout = () => {
  router.push('/signin')
  VueCookie.remove('POINTHUB_ACCESS_TOKEN')
}
</script>

<template>
  <nav class="header">
    <div class="header-container">
      <!-- Left Header -->
      <div class="flex items-center gap-4">
        <a
          href="javascript:void(0)"
          @click="sidebarStore.toggleSidebar()"
          id="sidebar-toggle-button"
        >
          <i v-if="!sidebarStore.isSidebarOpen" class="block w-6 h-6 i-far-bars"></i>
          <i v-else class="block w-6 h-6 i-far-xmark"></i>
        </a>
        <div></div>
      </div>
      <!-- Right Header -->
      <div class="flex items-center">
        <!-- User -->
        <base-popover ref="accountPopoverRef" placement="bottom-end">
          <button type="button" class="flex gap-2" @click="accountPopoverRef.toggle()">
            <div class="hidden lg:flex flex-col justify-center items-end">
              <p class="text-sm truncate font-semibold">DocuRemind</p>
              <p class="text-sm truncate">{{ authStore.name }}</p>
            </div>
            <base-avatar
              size="xs"
              src="https://placehold.co/150"
              shape="squircle"
              name="John Doe"
            />
          </button>
          <template #content>
            <div class="popper-root p-2">
              <base-button
                variant="text"
                color="primary"
                size="sm"
                class="text-slate-900 dark:text-slate-50 flex justify-left!"
              >
                <base-avatar
                  size="xs"
                  src="https://via.placeholder.com/150"
                  shape="squircle"
                  name="John Doe"
                />
                <div class="flex flex-col justify-center items-start text-left text-sm">
                  <p class="font-semibold line-clamp-2">Organization Name</p>
                  <p class="line-clamp-2">Username</p>
                </div>
              </base-button>
              <base-divider orientation="vertical" />

              <base-button
                variant="text"
                color="primary"
                size="sm"
                @click="toggleDarkMode()"
                class="text-slate-900 dark:text-slate-50 flex justify-left!"
              >
                <BaseIcon v-if="isDarkMode" icon="i-ph-sun-duotone" class="text-2xl" />
                <BaseIcon v-else icon="i-ph-moon-duotone" class="text-2xl" />
                <p>Dark Mode</p>
              </base-button>
              <base-button
                variant="text"
                color="danger"
                size="sm"
                class="text-slate-900 dark:text-slate-50 flex justify-left!"
                @click="onSignout()"
              >
                <BaseIcon icon="i-ph-sign-out-duotone" class="text-2xl" />
                <p>Sign Out</p>
              </base-button>
            </div>
          </template>
        </base-popover>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="postcss">
nav.header {
  @apply fixed top-0 flex w-full h-60px max-h-60px z-10 px-4 bg-white dark:bg-slate-900 shadow transition-all;
}

.is-sidebar-open nav.header {
  @apply lg:w-[calc(100%-(var(--sidebar-panel-width)+var(--sidebar-menu-width)))] lg:ml-[calc(var(--sidebar-panel-width)+var(--sidebar-menu-width))] duration-300 transition-all;
}

.header-container {
  @apply relative w-full flex items-center justify-between;
}
</style>
