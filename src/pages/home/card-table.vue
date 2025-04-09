<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'

import CardBorrowApproval from './card-borrow-approval.vue'
import CardBorrowHistory from './card-borrow-history.vue'
import CardExpired from './card-expired.vue'

const authStore = useAuthStore()
</script>

<template>
  <card-expired v-if="authStore.role === 'admin'" />
  <card-borrow-approval v-if="authStore.role === 'admin'" />
  <card-borrow-history />
</template>

<style scoped lang="postcss"></style>
