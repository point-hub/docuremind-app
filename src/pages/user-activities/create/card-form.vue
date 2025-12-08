<script setup lang="ts">
import { ref, watch } from 'vue'

import type { IFormError } from './form'

const username = defineModel<string>('username')
const name = defineModel<string>('name')
const email = defineModel<string>('email')
const role = defineModel<string>('role')
const password = defineModel<string>('password')
const errors = defineModel<IFormError>('errors')

interface IOption {
  _id: string
  label: string
}

const roleOptions: IOption[] = [
  {
    _id: 'admin',
    label: 'Admin'
  },
  {
    _id: 'user',
    label: 'User'
  }
]
const roleSelected = ref<IOption>(roleOptions[1])
watch(
  () => roleSelected.value,
  (option: IOption) => {
    role.value = option?._id ?? ''
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <base-card>
    <template #header>Users</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input required v-model="username" label="Username" :errors="errors?.username" />
      <base-input required v-model="email" label="Email" :errors="errors?.email" />
      <base-input required v-model="password" label="Password" type="password" :errors="errors?.password" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-select label="Role" required v-model="roleSelected" :options="roleOptions" :errors="errors?.role" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
