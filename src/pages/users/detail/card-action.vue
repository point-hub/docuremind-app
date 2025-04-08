<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import DeleteModal from '../components/delete/delete-modal.vue'
import type { IForm } from './form'

const route = useRoute()
const router = useRouter()
const deleteModalRef = ref()
const authStore = useAuthStore()
const data = defineModel<IForm>('data')

const onDeleted = async () => {
  if (authStore.role !== 'admin') {
    router.push('/unauthorized')
  }

  router.push('/users')
}
</script>

<template>
  <base-card class="py-4!">
    <div class="flex gap-2">
      <router-link :to="`/users/create`">
        <base-button color="info" size="sm">Create</base-button>
      </router-link>

      <router-link :to="`/users/${route.params.id}/edit`">
        <base-button color="info" size="sm">Edit</base-button>
      </router-link>

      <base-button
        v-if="authStore.role === 'admin' && data?.role !== 'admin'"
        color="danger"
        size="sm"
        @click="
          deleteModalRef.toggleModal(true, {
            id: route.params.id.toString(),
            name: `${data?.name}`
          })
        "
      >
        Delete
      </base-button>
    </div>
    <delete-modal ref="deleteModalRef" @deleted="onDeleted" />
  </base-card>
</template>
