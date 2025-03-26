<script setup lang="ts">
import { inject, onMounted, reactive, type Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { IToastRef } from '@/main-app.vue'
import { useAuthStore } from '@/stores/auth.store'
import { handleError } from '@/utils/api'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import CardRack from './card-rack.vue'
import { useForm } from './form'
import { useGetVaultApi } from './retrieve.api'
import { useUpdateVaultApi } from './update.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getVaultApi = useGetVaultApi()
const updateVaultApi = useUpdateVaultApi()

const form = reactive(useForm())
const formId = ref()
const toastRef = inject<Ref<IToastRef>>('toastRef')

onMounted(async () => {
  if (authStore.role !== 'admin') {
    router.push('/unauthorized')
  }

  const response = await getVaultApi.send(route.params.id.toString())

  if (response) {
    formId.value = response._id
    form.data.code = response.code
    form.data.name = response.name
    form.data.racks = response.racks
  }
})

const onUpdate = async () => {
  if (authStore.role !== 'admin') {
    router.push('/unauthorized')
  }

  try {
    const response = await updateVaultApi.send(route.params.id.toString(), form.data, form.errors)
    if (response) router.push('/vaults')
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

    <card-form
      :form-id="route.params.id.toString()"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      :errors="form.errors"
    />

    <card-rack v-model:racks="form.data.racks" :errors="form.errors" />

    <base-card class="py-4!">
      <div class="flex gap-2">
        <base-button color="primary" @click="onUpdate()">Update</base-button>
      </div>
    </base-card>
  </div>
</template>
