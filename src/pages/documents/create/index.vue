<script setup lang="ts">
import { inject, onMounted, reactive, type Ref } from 'vue'
import { useRouter } from 'vue-router'

import type { IToastRef } from '@/main-app.vue'
import { useAuthStore } from '@/stores/auth.store'
import { handleError } from '@/utils/api'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useCreateDocumentApi } from './create.api'
import { useForm } from './form'

const router = useRouter()
const form = reactive(useForm())
const authStore = useAuthStore()
const createDocumentsApi = useCreateDocumentApi()
const toastRef = inject<Ref<IToastRef>>('toastRef')

onMounted(async () => {
  if (authStore.role !== 'admin') {
    router.push('/unauthorized')
  }
})

const onSave = async () => {
  try {
    const response = await createDocumentsApi.send(form.data)
    if (response?.inserted_id) router.push('/documents')
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
      v-model:code="form.data.code"
      v-model:name="form.data.name"
      v-model:type="form.data.type"
      v-model:owner="form.data.owner"
      v-model:vault="form.data.vault"
      v-model:rack="form.data.rack"
      v-model:issued_date="form.data.issued_date"
      v-model:expired_date="form.data.expired_date"
      v-model:notes="form.data.notes"
      :errors="form.errors"
    />

    <base-card class="py-4!">
      <div class="flex gap-2">
        <base-button color="primary" @click="onSave()">Save</base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
