<script setup lang="ts">
import { ref } from 'vue'

import type { IFormError } from './form'

const showModal = ref(false)
const updateModal = ref(false)
const racks = defineModel<{ code: string; name: string }[]>('racks')
const code = ref('')
const name = ref('')
const errors = defineModel<IFormError>('errors')

const onAdd = () => {
  updateIndex.value = undefined
  if (checkCodeUnique(code.value) && checkNameUnique(name.value)) {
    errors.value = {}
  } else {
    errors.value = {
      code: checkCodeUnique(code.value) ? [] : ['Code must be unique'],
      name: checkNameUnique(name.value) ? [] : ['Name must be unique']
    }
    return
  }

  if (!code.value || !name.value) {
    errors.value = {
      code: !code.value ? ['Code is required'] : [],
      name: !name.value ? ['Name is required'] : []
    }
    return
  }

  racks.value?.push({ code: code.value, name: name.value })
  code.value = ''
  name.value = ''
  showModal.value = false
}

const updateIndex = ref()
const onUpdate = () => {
  if (checkCodeUnique(code.value) && checkNameUnique(name.value)) {
    errors.value = {}
  } else {
    errors.value = {
      code: checkCodeUnique(code.value) ? [] : ['Code must be unique'],
      name: checkNameUnique(name.value) ? [] : ['Name must be unique']
    }
    return
  }

  if (!code.value || !name.value) {
    errors.value = {
      code: !code.value ? ['Code is required'] : [],
      name: !name.value ? ['Name is required'] : []
    }
    return
  }

  if (racks.value) {
    racks.value[updateIndex.value].code = code.value
    racks.value[updateIndex.value].name = name.value
    code.value = ''
    name.value = ''
  }
  updateModal.value = false
}

const onEdit = (index: number) => {
  updateIndex.value = index
  code.value = racks.value?.[index].code ?? ''
  name.value = racks.value?.[index].name ?? ''
  updateModal.value = true
}

const onDelete = (index: number) => {
  racks.value?.splice(index, 1)
}

const checkCodeUnique = (value: string) => {
  let filteredArr = racks.value
  if (updateIndex.value !== undefined) {
    filteredArr = filteredArr?.filter((_, index) => index !== updateIndex.value)
  }
  console.log(filteredArr)
  return filteredArr?.findIndex((rack) => rack.code === value) === -1
}
const checkNameUnique = (value: string) => {
  let filteredArr = racks.value
  if (updateIndex.value !== undefined) {
    filteredArr = filteredArr?.filter((_, index) => index !== updateIndex.value)
  }
  return filteredArr?.findIndex((rack) => rack.name === value) === -1
}
</script>

<template>
  <base-card>
    <template #header>Racks</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rack, index) in racks" :key="rack.code">
            <td>{{ rack.code }}</td>
            <td>{{ rack.name }}</td>
            <td>
              <base-button size="xs" color="primary" @click="onEdit(index)">Edit</base-button>
              <base-button size="xs" color="danger" class="ml-2" @click="onDelete(index)">
                Delete
              </base-button>
            </td>
          </tr>
        </tbody>
      </base-table>
      <div>
        <base-button size="xs" color="primary" @click="showModal = true">Add</base-button>
        <span class="ml-2 text-red-500" v-if="errors?.racks">Rack is required</span>
      </div>
    </div>
  </base-card>

  <base-modal :is-open="showModal" @on-close="showModal = false">
    <div class="max-h-90vh overflow-auto p-4">
      <h2 class="py-4 text-2xl font-bold">Rack</h2>
      <div class="space-y-8">
        <base-input required v-model="code" label="Code" :errors="errors?.code" />
        <base-input required v-model="name" label="Name" :errors="errors?.name" />
        <base-button color="primary" size="xs" @click="onAdd()" is-block> Add </base-button>
      </div>
    </div>
  </base-modal>

  <base-modal :is-open="updateModal" @on-close="updateModal = false">
    <div class="max-h-90vh overflow-auto p-4">
      <h2 class="py-4 text-2xl font-bold">Rack</h2>
      <div class="space-y-8">
        <base-input required v-model="code" label="Code" :errors="errors?.code" />
        <base-input required v-model="name" label="Name" :errors="errors?.name" />
        <base-button color="primary" size="xs" @click="onUpdate()" is-block> Update </base-button>
      </div>
    </div>
  </base-modal>
</template>

<style scoped lang="postcss"></style>
