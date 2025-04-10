<script setup lang="ts">
import { reactive } from 'vue'

import type { IFormError } from './form'
import { usePassword } from './password.ts'

const passwordStore = reactive(usePassword())

const password = defineModel<string>('password')
const errors = defineModel<IFormError>('errors')
</script>

<template>
  <base-card>
    <template #header>Update Password</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input
        required
        :type="passwordStore.type"
        v-model="password"
        :errors="errors?.password"
        label="Password"
        layout="vertical"
      >
        <template #suffix>
          <BaseButton @click="passwordStore.toggle" variant="text" color="secondary">
            <BaseIcon icon="i-far-eye" />
          </BaseButton>
        </template>
      </base-input>
      <base-input
        required
        :type="passwordStore.type"
        v-model="password"
        :errors="errors?.password"
        label="Password Confirmation"
        layout="vertical"
      >
        <template #suffix>
          <BaseButton @click="passwordStore.toggle" variant="text" color="secondary">
            <BaseIcon icon="i-far-eye" />
          </BaseButton>
        </template>
      </base-input>

      <div class="flex gap-2">
        <base-button size="xs" color="primary">Update Password</base-button>
      </div>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
