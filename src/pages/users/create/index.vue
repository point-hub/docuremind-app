<script setup lang="ts">
import { inject, onMounted, reactive, type Ref } from 'vue'
import { useRouter } from 'vue-router'

import type { IToastRef } from '@/main-app.vue'
import { useAuthStore } from '@/stores/auth.store'
import { handleError } from '@/utils/api'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useCreateUserApi } from './create.api'
import { useForm } from './form'

const router = useRouter()
const form = reactive(useForm())
const authStore = useAuthStore()
const createUsersApi = useCreateUserApi()
const toastRef = inject<Ref<IToastRef>>('toastRef')

onMounted(async () => {
  if (authStore.role !== 'admin') {
    router.push('/unauthorized')
  }
})

const onSave = async () => {
  try {
    const response = await createUsersApi.send(form.data)
    if (response?.inserted_id) router.push('/users')
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.errors) {
      form.errors.username = errorResponse.errors.username || []
      form.errors.name = errorResponse.errors.name || []
      form.errors.email = errorResponse.errors.email || []
      form.errors.password = errorResponse.errors.password || []
      form.errors.role = errorResponse.errors.role || []
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
      v-model:name="form.data.name"
      v-model:username="form.data.username"
      v-model:email="form.data.email"
      v-model:role="form.data.role"
      v-model:password="form.data.password"
      :errors="form.errors"
    />
    {{ form }}
    <base-card class="py-4!">
      <div class="flex gap-2">
        <base-button color="primary" @click="onSave()">Save</base-button>
      </div>
    </base-card>
  </div>
</template>

<style scoped lang="postcss"></style>
