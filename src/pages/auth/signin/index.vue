<script setup lang="ts">
import { inject, onMounted, reactive, type Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { IToastRef } from '@/main-app.vue'
import { handleError } from '@/utils/api'

import { signinApiRequest } from './api/signin.api'
import { useForm } from './form'
import { usePassword } from './password'

const form = useForm()
const password = reactive(usePassword())
const router = useRouter()
const route = useRoute()
const redirectUrl = ref()
const toastRef = inject<Ref<IToastRef>>('toastRef')

onMounted(() => {
  redirectUrl.value = route.query.redirect_url
})

const onSubmit = async () => {
  try {
    const response = await signinApiRequest(form.data.value)
    if (response.status === 200) {
      router.push('/home')
    }
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.errors) {
      form.errors.value.username = errorResponse.errors.username || []
      form.errors.value.password = errorResponse.errors.password || []
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
    <div v-if="false">
      You can’t sign in because this app sent an invalid request. You can try again later, or
      contact the developer about this issue.
    </div>
    <form v-else @submit.prevent="onSubmit" class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <div class="-mt-4">
          <h3 class="font-semibold">Sign in with Pointhub</h3>
          to continue to <a href="#" target="_blank" class="text-blue-600">Pointhub Auth Service</a>
        </div>

        <div class="flex flex-col gap-4">
          <base-input
            required
            autofocus
            v-model="form.data.value.username"
            :errors="form.errors.value.username"
            label="Email"
            layout="vertical"
          />
          <base-input
            required
            :type="password.type"
            v-model="form.data.value.password"
            :errors="form.errors.value.password"
            label="Password"
            layout="vertical"
          >
            <template #suffix>
              <BaseButton @click="password.toggle" variant="text" color="secondary">
                <BaseIcon icon="i-far-eye" />
              </BaseButton>
            </template>
          </base-input>
          <div class="flex justify-between">
            <base-checkbox v-model="form.data.value.remember_me" text="Remember Me" />
            <router-link to="/forgot-password">Forgot Password</router-link>
          </div>
        </div>
      </div>
    </form>
  </base-card>
</template>

<style scoped lang="postcss"></style>
