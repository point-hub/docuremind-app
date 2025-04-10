<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

export interface ISelectedExpiredDate {
  _id: string
  label: string
  name?: string
}

const _id = defineModel<string>()
const placeholder = defineModel<string>('placeholder')
const options = defineModel<ISelectedExpiredDate[]>('options')
const selected = defineModel<ISelectedExpiredDate>('selected')
const required = defineModel<boolean>('required', { default: false })
const disabled = defineModel<boolean>('disabled', { default: false })
const title = defineModel<string>('title', { default: 'Expired Date' })
const border = defineModel<'full' | 'simple' | 'none'>('border')
const errors = defineModel<string[]>('errors')

const search = ref('')
const isLoading = ref<boolean>(false)
const localOptions = ref<ISelectedExpiredDate[]>()

watch(search, () => {
  // start loading without debounced for smooth ux
  if (!localOptions.value) {
    options.value = []
    isLoading.value = true
  }

  if (search.value.length === 0) {
    options.value = localOptions.value
    isLoading.value = false
    return
  }

  options.value = options.value?.filter((option) => {
    return option.label.toLowerCase().includes(search.value.toLowerCase())
  })
  isLoading.value = false
})

watch(
  selected,
  () => {
    if (selected.value) _id.value = selected.value._id
  },
  { immediate: true, deep: true }
)

onMounted(async () => {
  options.value = [
    { _id: 'all', label: 'all' },
    { _id: 'expired_7_days', label: 'expired within 7 days' },
    { _id: 'expired', label: 'expired' }
  ]
  localOptions.value = options.value
})
</script>

<template>
  <base-choosen
    :title="title"
    v-model:search="search"
    v-model:selected="selected"
    :is-loading="isLoading"
    :required="required"
    :disabled="disabled"
    :options="options"
    :errors="errors"
    :border="border"
    :placeholder="placeholder"
  />
</template>
