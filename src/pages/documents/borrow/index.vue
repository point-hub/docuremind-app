<script setup lang="ts">
import { inject, onMounted, reactive, type Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { IToastRef } from '@/main-app.vue'
import { useAuthStore } from '@/stores/auth.store'
import { handleError } from '@/utils/api'

import { useBorrowDocumentApi } from './borrow.api'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetDocumentApi } from './retrieve.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getDocumentApi = useGetDocumentApi()
const borrowDocumentApi = useBorrowDocumentApi()

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
const onBorrow = async () => {
  if (authStore.role !== 'admin') {
    router.push('/unauthorized')
  }

  try {
    isSaving.value = true
    const response = await borrowDocumentApi.send(
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
      :form-id="route.params.id.toString()"
      v-model:user="form.data.user"
      v-model:document="form.data.document"
      v-model:required_date="form.data.required_date"
      v-model:return_due_date="form.data.return_due_date"
      v-model:reason_for_borrowing="form.data.reason_for_borrowing"
      :errors="form.errors"
    />

    <base-card class="py-4!">
      <div class="flex gap-2">
        <base-button color="primary" @click="onBorrow()" :disabled="isSaving">
          <template v-if="!isSaving">Borrow</template>
          <template v-else>
            Updating <base-icon icon="i-fas-spinner" class="h-4 w-4 animate-spin" />
          </template>
        </base-button>
      </div>
    </base-card>
  </div>
</template>
