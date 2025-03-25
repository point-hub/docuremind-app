<script setup lang="ts">
import { inject, type Ref, ref } from 'vue'

import type { IToastRef } from '@/main-app.vue'

import { useDeleteOwnerApi } from './delete.api'
import type { IFormError } from './form'

const toastRef = inject<Ref<IToastRef>>('toastRef')

const password = ref()
const errors = ref<IFormError>({
  password: [],
  reason: []
})
const id = defineModel<string>('id')
const name = defineModel<string>('name')
const emit = defineEmits(['deleted'])

interface IData {
  id: string
  name: string
}
const showModal = ref(false)
const toggleModal = (state?: boolean, data?: IData) => {
  if (data) {
    id.value = data.id
    name.value = data.name
  }
  let newValue = !showModal.value
  if (state === true) {
    newValue = true
    loadingState.value = false
  }
  if (state === false) newValue = false
  showModal.value = newValue
}

const reason = ref<string>()
const loadingState = ref(false)
const onDelete = async () => {
  // prevent calling twice use loading state
  if (loadingState.value) return
  // start loading state
  loadingState.value = true
  // start api call
  const deleteOwnerApi = useDeleteOwnerApi()
  const responseDelete = await deleteOwnerApi.send(id.value as string, errors.value)
  if (!responseDelete) {
    loadingState.value = false
    return
  }

  emit('deleted')
  password.value = ''
  reason.value = ''
  toastRef?.value.toast(`Delete Owner "${name.value}" success`, { color: 'success' })

  toggleModal(false)

  // stop loading state
  loadingState.value = false
}

defineExpose({
  showModal,
  toggleModal,
  id,
  name,
  loadingState
})
</script>

<template>
  <base-modal :is-open="showModal" @on-close="toggleModal(false)">
    <div class="max-h-90vh overflow-auto p-4">
      <h2 class="py-4 text-2xl font-bold">Delete Owner</h2>
      <div class="space-y-8">
        <p>Are you sure want to delete?</p>
        <div class="flex gap-2">
          <base-button color="danger" size="sm" @click="onDelete()" :disabled="loadingState">
            Confirm
          </base-button>
          <base-button color="secondary" size="sm" @click="toggleModal(false)">
            Cancel
          </base-button>
        </div>
      </div>
    </div>
  </base-modal>
</template>
