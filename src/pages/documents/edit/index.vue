<script setup lang="ts">
import { inject, onMounted, reactive, type Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { IToastRef } from '@/main-app.vue'
import { useAuthStore } from '@/stores/auth.store'
import { handleError } from '@/utils/api'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetDocumentApi } from './retrieve.api'
import { useUpdateDocumentApi } from './update.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getDocumentApi = useGetDocumentApi()
const updateDocumentApi = useUpdateDocumentApi()

const form = reactive(useForm())
const formId = ref()
const toastRef = inject<Ref<IToastRef>>('toastRef')

onMounted(async () => {
  if (authStore.role !== 'admin') {
    router.push('/unauthorized')
  }

  const response = await getDocumentApi.send(route.params.id.toString())

  if (response) {
    formId.value = response._id
    form.data = response
  }
})

const isSaving = ref(false)
const onUpdate = async () => {
  if (authStore.role !== 'admin') {
    router.push('/unauthorized')
  }

  try {
    isSaving.value = true
    const response = await updateDocumentApi.send(
      route.params.id.toString(),
      form.data,
      form.errors
    )
    if (response) router.push('/documents')
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
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form
      v-model:cover="form.data.cover"
      v-model:cover_url="form.data.cover_url"
      v-model:document_files="form.data.document_files"
      v-model:new_files="form.data.new_files"
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
        <base-button color="primary" @click="onUpdate()" :disabled="isSaving">
          <template v-if="!isSaving">Update</template>
          <template v-else>
            Updating <base-icon icon="i-fas-spinner" class="h-4 w-4 animate-spin" />
          </template>
        </base-button>
      </div>
    </base-card>
  </div>
</template>
