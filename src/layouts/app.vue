<script setup lang="ts">
import {
  AppPreloader,
  AppSidebar,
  useMobileBreakpoint,
  useSidebar,
  useSidebarStore
} from '@point-hub/papp'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import AppFooter from '@/components/app-footer.vue'
import AppHeader from '@/components/app-header.vue'
import { useAppMenu } from '@/composable/app-menu'

import { version } from '../../package.json'

const route = useRoute()

useSidebar()

const appMenu = reactive(useAppMenu())
const mobileBreakpoint = useMobileBreakpoint()
const sidebarStore = useSidebarStore()

const choosenAppIndex = ref(0)
const choosenTitle = ref('')
const onChooseApp = (path: string) => {
  for (const [index, app] of appMenu.menus.entries()) {
    if (app.path === path) {
      choosenTitle.value = app.name
      choosenAppIndex.value = index
    }
  }
}

onMounted(() => {
  for (const [index, app] of appMenu.menus.entries()) {
    if (route.path.includes(app.path)) {
      choosenTitle.value = app.name
      choosenAppIndex.value = index
    }
  }
})
</script>

<template>
  <component :is="AppPreloader" />

  <div class="app-layout">
    <!-- Header -->
    <app-header></app-header>

    <!-- Sidebar -->
    <component
      :is="AppSidebar"
      :title="choosenTitle"
      :apps="appMenu.menus"
      :menus="appMenu.menus[choosenAppIndex].menu ?? []"
      :is-sidebar-open="sidebarStore.isSidebarOpen"
      :is-mobile="mobileBreakpoint.isMobile()"
      @choose="onChooseApp"
    />

    <!-- Main Container -->
    <div class="main-container">
      <!-- Main Content -->
      <main class="main-content">
        <router-view></router-view>
      </main>

      <!-- Footer -->
      <app-footer :version="version"></app-footer>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.app-layout {
  @apply h-100vh w-full flex grow;
}

.main-container {
  @apply flex flex-col py-4 space-y-8 w-full transition-all duration-300;
}

.is-sidebar-open .main-container {
  @apply lg:w-[calc(100%-(var(--sidebar-panel-width)+var(--sidebar-menu-width)))] lg:ml-[calc(var(--sidebar-panel-width)+var(--sidebar-menu-width))];
}

.main-content {
  @apply mt-[60px] px-4 flex-1;
}

.main-content-header {
  @apply flex space-x-4 py-2 overflow-x-hidden;
}

.main-content-body {
  @apply flex flex-col space-y-5;
}
</style>
