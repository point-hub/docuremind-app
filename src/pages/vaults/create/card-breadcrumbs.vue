<script setup lang="ts">
import AppBreadcrumb from '@/components/app-breadcrumb.vue'

const breadcrumbs = [
  {
    name: 'Home',
    path: '/home'
  },
  {
    name: 'Vaults',
    path: '/vaults'
  },
  {
    name: 'Create'
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
