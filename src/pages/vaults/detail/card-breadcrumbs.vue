<script setup lang="ts">
import { useRoute } from 'vue-router'

import AppBreadcrumb, { type IBreadcrumb } from '@/components/app-breadcrumb.vue'

const route = useRoute()

const breadcrumbs: IBreadcrumb[] = [
  {
    name: 'Home',
    path: '/home'
  },
  {
    name: 'Vaults',
    path: '/vaults'
  },
  {
    name: `${route.params.id}`
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
