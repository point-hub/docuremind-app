<script setup lang="ts">
import { inject, onMounted, reactive, type Ref } from 'vue'
import { useRouter } from 'vue-router'

import type { IToastRef } from '@/main-app.vue'
import { useAuthStore } from '@/stores/auth.store'
import { handleError } from '@/utils/api'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import CardRack from './card-rack.vue'
import { useCreateVaultApi } from './create.api'
import { useForm } from './form'

const router = useRouter()
const form = reactive(useForm())
const authStore = useAuthStore()
const createVaultsApi = useCreateVaultApi()
const toastRef = inject<Ref<IToastRef>>('toastRef')

onMounted(async () => {
  if (authStore.role !== 'admin') {
    router.push('/unauthorized')
  }
})

const onSave = async () => {
  try {
    const response = await createVaultsApi.send(form.data)
    if (response?.inserted_id) router.push('/vaults')
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.errors) {
      form.errors.code = errorResponse.errors.code || []
      form.errors.name = errorResponse.errors.name || []
      form.errors.racks = errorResponse.errors.racks || []
    }
    if (errorResponse.message) {
      toastRef?.value.toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger'
      })
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form v-model:code="form.data.code" v-model:name="form.data.name" :errors="form.errors" />

    <card-rack v-model:racks="form.data.racks" :errors="form.errors" />

    <base-card class="py-4!">
      <div class="flex gap-2">
        <base-button color="primary" @click="onSave()">Save</base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
