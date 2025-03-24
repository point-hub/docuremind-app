<script setup lang="ts">
import type { IFormError } from './form'

const code = defineModel<string>('code')
const name = defineModel<string>('name')
const errors = defineModel<IFormError>('errors')
</script>

<template>
  <base-card>
    <template #header>Vaults</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input required v-model="code" label="Code" :errors="errors?.code" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
