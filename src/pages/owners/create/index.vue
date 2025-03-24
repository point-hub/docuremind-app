<script setup lang="ts">
import { inject, onMounted, reactive, type Ref } from 'vue'
import { useRouter } from 'vue-router'

import type { IToastRef } from '@/main-app.vue'
import { useAuthStore } from '@/stores/auth.store'
import { handleError } from '@/utils/api'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useCreateOwnerApi } from './create-owner.api'
import { useForm } from './form'

const router = useRouter()
const form = reactive(useForm())
const authStore = useAuthStore()
const createOwnersApi = useCreateOwnerApi()
const toastRef = inject<Ref<IToastRef>>('toastRef')

onMounted(async () => {
  if (authStore.role !== 'admin') {
    router.push('/unauthorized')
  }
})

const onSave = async () => {
  try {
    const response = await createOwnersApi.send(form.data, form.errors)
    if (response?.inserted_id) router.push('/owners')
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.errors) {
      form.errors.name = errorResponse.errors.name || []
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

    <card-form v-model:name="form.data.name" :errors="form.errors" />

    <base-card class="py-4!">
      <div class="flex gap-2">
        <base-button color="primary" @click="onSave()">Save</base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
