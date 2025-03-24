<script setup lang="ts">
import { ref, watch } from 'vue'

import type { IFormError } from './form'

const code = defineModel<string>('code')
const name = defineModel<string>('name')
const address = defineModel<string>('address')
const phone = defineModel<string>('phone')
const notes = defineModel<string>('notes')
const errors = defineModel<IFormError>('errors')

const helpers = ref(['This code is used to generate warehouse code based on the owner'])

watch(code, () => {
  code.value = code.value?.toUpperCase() ?? ''
  if (code.value?.length === 4) {
    helpers.value[1] = `The code max length is 4.`
  }
})
</script>

<template>
  <base-card>
    <template #header>Owners</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
