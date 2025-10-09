<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

import { useGetOwnersApi } from './retrieve-all.api'

export interface ISelectedOwner {
  _id: string
  label: string
  code: string
  name: string
}

const _id = defineModel<string>()
const options = defineModel<ISelectedOwner[]>('options')
const selected = defineModel<ISelectedOwner>('selected')
const required = defineModel<boolean>('required', { default: false })
const label = defineModel<string>('label')
const errors = ref<string[]>([])

const getOwnersApi = useGetOwnersApi()
const search = ref('')
const isLoading = ref<boolean>(false)
const localOptions = ref<ISelectedOwner[]>()

const apiCall = async () => {
  const response = await getOwnersApi.send(search.value, 1)
  if (response?.data) {
    options.value = response.data.map((data: ISelectedOwner) => {
      return {
        _id: data._id,
        label: data.label,
        code: data.code,
        name: data.name
      }
    })
  }
  // finish loading
  isLoading.value = false
}

watch(search, () => {
  // start loading without debounced for smooth ux
  if (!localOptions.value) {
    isLoading.value = true
  }
})

watchDebounced(
  search,
  async () => {
    if (!localOptions.value) {
      await apiCall()
    }
  },
  { debounce: 500, maxWait: 1000 }
)

watch(selected, () => {
  if (selected.value) _id.value = selected.value._id
})

onMounted(async () => {
  if (!options.value) {
    await apiCall()
  } else {
    localOptions.value = options.value
  }
})
</script>

<template>
  <base-select :required="required" :label="label" v-model="selected" v-model:query="search" :is-loading="isLoading"
    :options="options" :errors="errors" />
</template>
