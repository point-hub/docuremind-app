<script setup lang="ts">
import { inject, onMounted, reactive, type Ref } from 'vue'

import type { IToastRef } from '@/main-app.vue'
import { useAuthStore } from '@/stores/auth.store'
import { handleError } from '@/utils/api'

import { useForm } from './form'
import { useGetUserApi } from './retrieve.api'
import { useUpdateUserApi } from './update.api'

const formId = defineModel<string>('form-id')

const getUserApi = useGetUserApi()
const authStore = useAuthStore()

const updateUserApi = useUpdateUserApi()
const toastRef = inject<Ref<IToastRef>>('toastRef')
const form = reactive(useForm())

onMounted(async () => {
  const response = await getUserApi.send(authStore._id)

  if (response) {
    formId.value = response._id
    form.data.username = response.username
    form.data.email = response.email
    form.data.name = response.name
    form.data.role = response.role
  }
})

const onUpdate = async () => {
  try {
    const response = await updateUserApi.send(formId.value ?? '', form.data, form.errors)
    if (response?.modified_count === 1) {
      toastRef?.value.toast('Update success', { color: 'success' })
    }
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
  <base-card>
    <template #header>Profile</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input
        required
        v-model="form.data.username"
        label="Username"
        :errors="form.errors?.username"
      />
      <base-input
        required
        disabled
        v-model="form.data.email"
        label="Email"
        :errors="form.errors?.email"
      />
      <base-input
        required
        disabled
        v-model="form.data.name"
        label="Name"
        :errors="form.errors?.name"
      />
      <div class="flex gap-2">
        <base-button size="xs" color="primary" @click="onUpdate">Update</base-button>
      </div>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
