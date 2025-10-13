<script setup lang="ts">
import { inject, onMounted, reactive, type Ref, ref } from 'vue'
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

const isSaving = ref(false)
const onSave = async () => {
  try {
    isSaving.value = true
    const response = await createDocumentsApi.send(form.data)
    if (response?.inserted_id) router.push('/documents')
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.errors) {
      form.errors.code = errorResponse.errors.code || []
      form.errors.name = errorResponse.errors.name || []
      form.errors.type = errorResponse.errors.type || []
      form.errors.vault = errorResponse.errors.vault || []
      form.errors.owner = errorResponse.errors.owner || []
      form.errors.rack = errorResponse.errors.rack || []
      form.errors.cover = errorResponse.errors.cover || []
      form.errors.files = errorResponse.errors.files || []
    }
    if (errorResponse.message) {
      toastRef?.value.toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger'
      })
    }
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <div class="bg-red w-full h-full"></div>

    <card-form v-model:cover="form.data.cover" v-model:code="form.data.code" v-model:name="form.data.name"
      v-model:type="form.data.type" v-model:owner="form.data.owner" v-model:vault="form.data.vault"
      v-model:rack="form.data.rack" v-model:issued_date="form.data.issued_date"
      v-model:due_date_reminder="form.data.due_date_reminder" v-model:expired_date="form.data.expired_date"
      v-model:notes="form.data.notes" v-model:document_files="form.data.document_files" :errors="form.errors" />

    <base-card class="py-4!">
      <div class="flex gap-2">
        <base-button color="primary" @click="onSave()" :disabled="isSaving">
          <template v-if="!isSaving">Save</template>
          <template v-else>
            Saving <base-icon icon="i-fa7-solid:spinner" class="h-4 w-4 animate-spin" />
          </template>
        </base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
