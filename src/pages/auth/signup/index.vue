<script setup lang="ts">
import { inject, type Ref, ref } from 'vue'

import type { IToastRef } from '@/main-app.vue'
import { handleError } from '@/utils/api'

import { isEmailExistsApiRequest } from './api/is-email-exists.api'
import { signupApiRequest } from './api/signup.api'
import signupSuccess from './components/signup-success.vue'
import { useForm } from './form'
import { usePassword } from './password'

const form = useForm()
const password = usePassword()
const isSignupSuccess = ref(false)
const signupEmail = ref()

const toastRef = inject<Ref<IToastRef>>('toastRef')

const onEmailChange = async () => {
  try {
    const response = await isEmailExistsApiRequest(form.data.value.email)
    if (response.data.exists === true) {
      form.errors.value.email = ['Email is exists']
    }
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.errors) {
      form.errors.value.email = errorResponse.errors.email || []
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

const onSubmit = async () => {
  if ((form.errors.value.password?.length ?? 0) > 0) {
    return toastRef?.value.toast('Please use strong password', { color: 'danger' })
  }
  if (!form.isPasswordConfirmed) {
    return toastRef?.value.toast('Password confirmation not match', { color: 'danger' })
  }
  if (!form.data.value.accept_terms) {
    return toastRef?.value.toast('Please accept terms & privacy', { color: 'danger' })
  }

  try {
    const response = await signupApiRequest(form.data.value)
    if (response.status === 201) {
      signupEmail.value = form.data.value.email
      form.reset()
      isSignupSuccess.value = true
    }
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.errors) {
      form.errors.value = {
        email: errorResponse.errors.email || [],
        password: errorResponse.errors.password || [],
        confirm_password: errorResponse.errors.confirm_password || [],
        accept_terms: errorResponse.errors.accept_terms || []
      }
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
  <base-card class="max-w-xl" v-if="isSignupSuccess === false">
    <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <base-input
          label="Email"
          layout="vertical"
          v-model="form.data.value.email"
          :errors="form.errors.value.email"
          @change="onEmailChange"
        />
        <base-input
          label="Password"
          layout="vertical"
          :type="password.type.value"
          v-model="form.data.value.password"
          :errors="form.errors.value.password"
          @keyup="form.passwordValidation()"
          :reset-errors-on-update="false"
        >
          <template #suffix>
            <BaseButton @click="password.toggle" variant="text">
              <BaseIcon icon="i-fa7-regular:eye" />
            </BaseButton>
          </template>
        </base-input>
        <base-input
          label="Confirm Password"
          layout="vertical"
          :type="password.type.value"
          v-model="form.data.value.confirm_password"
          :errors="form.errors.value.confirm_password"
          @keyup="form.confirmPasswordValidation()"
          :reset-errors-on-update="false"
        >
          <template #suffix>
            <base-button @click="password.toggle" variant="text">
              <base-icon icon="i-fa7-regular:eye" />
            </base-button>
          </template>
        </base-input>
        <div class="flex items-center">
          <base-checkbox v-model="form.data.value.accept_terms" />
          <p>
            Accept <a href="https://pointhub.net/privacy" target="_blank">Privacy</a> &
            <a href="https://pointhub.net/terms" target="_blank">Terms</a>
          </p>
        </div>
      </div>
      <base-button type="submit" color="primary">Sign Up</base-button>
    </form>
  </base-card>
  <signup-success v-else :email="signupEmail"></signup-success>
</template>
