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
    name: 'Owners',
    path: '/owners'
  },
  {
    name: `${route.params.id}`,
    path: `/owners/${route.params.id}`
  },
  {
    name: 'Edit'
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
