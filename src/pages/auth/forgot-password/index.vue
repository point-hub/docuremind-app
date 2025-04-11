<script setup lang="ts">
import { inject, type Ref } from 'vue'

import type { IToastRef } from '@/main-app.vue'
import { handleError } from '@/utils/api'

import { requestPasswordApiRequest } from './api/request-password.api'
import { useForm } from './form'

const form = useForm()
const toastRef = inject<Ref<IToastRef>>('toastRef')

const onSubmit = async () => {
  try {
    const response = await requestPasswordApiRequest(form.data.value.email)
    if (response.status === 200) {
      toastRef?.value.toast('Success request password, please check your email', {
        timer: 5000,
        color: 'success'
      })
      form.data.value.email = ''
    }
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.errors) {
      form.errors.value.email = errorResponse.errors.email || []
      return
    }
    if (errorResponse.message) {
      toastRef?.value.toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger',
        timer: 5000
      })
    }
  }
}
</script>

<template>
  <base-card class="max-w-xl">
    <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <base-input
          v-model="form.data.value.email"
          :errors="form.errors.value.email"
          label="Email"
          layout="vertical"
          autofocus
        />
      </div>
      <base-button type="submit" color="primary">Request Reset Password</base-button>
    </form>
    <div class="mt-4">Remember Password ? <router-link to="/signin">Sign In</router-link></div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
