<script setup lang="ts">
import { BaseButton, BaseCard, BaseInput } from '@point-hub/papp'
import { inject, type Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { IToastRef } from '@/main-app.vue'
import { handleError } from '@/utils/api'

import { resetPasswordApiRequest } from './reset-password.api'
const router = useRouter()
const form = ref({
  password: '',
  confirm_password: ''
})
const errors = ref<{ password: string[]; confirm_password: string[] }>({
  password: [],
  confirm_password: []
})
const route = useRoute()
const passwordType = ref<'text' | 'password'>('password')

const toggleRevealPassword = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}
const toastRef = inject<Ref<IToastRef>>('toastRef')
const onSubmit = async () => {
  if (form.value.password.length < 8) {
    errors.value.password = []
    errors.value.password.push('Use at least 8 characters')
    return toastRef?.value.toast('Use at least 8 characters', { color: 'danger' })
  }
  if (form.value.password !== form.value.confirm_password) {
    errors.value.confirm_password = []
    errors.value.confirm_password.push('Password do not match')
    return toastRef?.value.toast('Password confirmation not match', { color: 'danger' })
  }

  try {
    await resetPasswordApiRequest({
      code: route.params.code as string,
      password: form.value.password
    })
    toastRef?.value.toast('Reset password success', {
      color: 'success',
      timer: 5000
    })
    router.push('/signin')
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.errors) {
      errors.value.password = errorResponse.errors.password || []
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
  <component :is="BaseCard" class="max-w-xl">
    <form @submit.prevent="" class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <component
          :is="BaseInput"
          :type="passwordType"
          :errors="errors.password"
          v-model="form.password"
          label="New Password"
          layout="vertical"
        >
          <template #suffix>
            <BaseButton @click="toggleRevealPassword" variant="text" color="secondary">
              <BaseIcon icon="i-far-eye" />
            </BaseButton>
          </template>
        </component>
        <component
          :is="BaseInput"
          :type="passwordType"
          :errors="errors.confirm_password"
          v-model="form.confirm_password"
          label="Confirm Password"
          layout="vertical"
        >
          <template #suffix>
            <BaseButton @click="toggleRevealPassword" variant="text" color="secondary">
              <BaseIcon icon="i-far-eye" />
            </BaseButton>
          </template>
        </component>
      </div>
      <component :is="BaseButton" @click="onSubmit" color="primary">Reset Password</component>
    </form>
    <div class="mt-4">Remember your password? <router-link to="/signin">Sign In</router-link></div>
  </component>
</template>

<style scoped lang="postcss"></style>
