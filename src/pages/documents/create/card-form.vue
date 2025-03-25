<script setup lang="ts">
import { ref, watch } from 'vue'

import type { IFormError } from './form'

const code = defineModel<string>('code')
const name = defineModel<string>('name')
const type = defineModel<string>('type')
const owner = defineModel<string>('owner')
const vault = defineModel<string>('vault')
const rack = defineModel<string>('rack')
const issued_date = defineModel<string>('issued_date')
const expired_date = defineModel<string>('expired_date')
const notes = defineModel<string>('notes')
const errors = defineModel<IFormError>('errors')

interface IOption {
  _id: string
  label: string
}

const optionsType: IOption[] = [
  { _id: 'asli', label: 'Asli' },
  { _id: 'copy', label: 'Copy' },
  { _id: 'pengganti', label: 'Pengganti' }
]
const selectedType = ref()
watch(
  () => selectedType.value,
  () => {
    type.value = selectedType.value?._id ?? ''
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <base-card>
    <template #header>Documents</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input required v-model="code" label="Code" :errors="errors?.code" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-autocomplete
        v-model="selectedType"
        :options="optionsType"
        label="Type"
        description="Vertical Layout"
        layout="vertical"
      />
      <base-input required v-model="owner" label="Owner" :errors="errors?.owner" />
      <base-input required v-model="vault" label="Vault" :errors="errors?.vault" />
      <base-input required v-model="rack" label="Rack" :errors="errors?.rack" />
      <base-datepicker label="Issued Date" v-model="issued_date" />
      <base-datepicker label="Expired Date" v-model="expired_date" />
      <base-textarea label="Notes" v-model="notes" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
