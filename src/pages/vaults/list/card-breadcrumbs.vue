<script setup lang="ts">
import AppBreadcrumb from '@/components/app-breadcrumb.vue'

const breadcrumbs = [
  {
    name: 'Home',
    path: '/home'
  },
  {
    name: 'Vaults'
  }
]
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
