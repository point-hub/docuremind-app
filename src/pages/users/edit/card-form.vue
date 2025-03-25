<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import type { IFormError } from './form'

const username = defineModel<string>('username')
const email = defineModel<string>('email')
const name = defineModel<string>('name')
const role = defineModel<string>('role')
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

const roleSelected = ref<IOption>()

watch(
  () => role.value,
  () => {
    roleSelected.value = roleOptions.find((option) => option._id === role.value)
  }
)

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
      <base-input
        required
        disabled
        v-model="username"
        label="Username"
        :errors="errors?.username"
      />
      <base-input required disabled v-model="email" label="Email" :errors="errors?.email" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-autocomplete
        label="Role"
        required
        v-model="roleSelected"
        :options="roleOptions"
        :errors="errors?.role"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
