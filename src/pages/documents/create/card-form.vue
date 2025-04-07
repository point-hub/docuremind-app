<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import type { IFormError } from './form'
import { useGetOwnersApi } from './retrieve-all-owner.api'
import { useGetVaultsApi } from './retrieve-all-vault.api'

const cover = defineModel('cover')
const code = defineModel<string>('code')
const name = defineModel<string>('name')
const type = defineModel<string>('type')
const owner = defineModel<IOption>('owner')
const vault = defineModel<IOption>('vault')
const rack = defineModel<string>('rack')
const issued_date = defineModel<string>('issued_date')
const expired_date = defineModel<string>('expired_date')
const notes = defineModel<string>('notes')
const errors = defineModel<IFormError>('errors')

const ownersApi = useGetOwnersApi()
const owners = ref()
const vaultsApi = useGetVaultsApi()
const vaults = ref()
const optionsRack = ref()

onMounted(async () => {
  owners.value = await ownersApi.send({ all: '', name: '' }, 1)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  owners.value.data = owners?.value?.data.map((obj: any) => {
    return { ...obj, label: obj.name }
  })
  vaults.value = await vaultsApi.send({ all: '', name: '' }, 1)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vaults.value.data = vaults?.value?.data.map((obj: any) => {
    return { ...obj, label: obj.name }
  })
})

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
const selectedOwner = ref()
const selectedVault = ref()
const selectedRack = ref()

watch(
  () => selectedOwner.value,
  () => {
    owner.value = {
      _id: selectedOwner.value?._id ?? '',
      label: selectedOwner.value?.label ?? ''
    }
  },
  { deep: true }
)

watch(
  () => selectedRack.value,
  () => {
    rack.value = selectedRack.value?.label
  },
  { deep: true }
)

watch(
  () => selectedType.value,
  () => {
    type.value = selectedType.value?._id ?? ''
  },
  { deep: true }
)

watch(
  () => selectedVault.value,
  () => {
    vault.value = {
      _id: selectedVault.value?._id ?? '',
      label: selectedVault.value?.label ?? ''
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedVaults = selectedVault?.value?.racks?.map((obj: any) => {
      return { ...obj, label: obj.name }
    })

    optionsRack.value = updatedVaults
  },
  { deep: true }
)

interface HTMLInputEvent extends Event {
  target: HTMLInputElement
}

const onUpload = (e: HTMLInputEvent) => {
  if (e.target.files && e.target.files[0]) {
    cover.value = e.target.files[0]
  }
}
</script>

<template>
  <base-card>
    <template #header>Documents</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-file-upload label="Cover" @change="onUpload" />
      <base-input required v-model="code" label="Code" :errors="errors?.code" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-autocomplete
        required
        v-model="selectedType"
        :options="optionsType"
        label="Type"
        layout="vertical"
      />
      <base-autocomplete
        required
        v-model="selectedOwner"
        :options="owners?.data"
        label="Owner"
        layout="vertical"
      />
      <base-autocomplete
        required
        v-model="selectedVault"
        :options="vaults?.data"
        label="Vault"
        layout="vertical"
      />
      <base-autocomplete
        v-if="selectedVault"
        required
        v-model="selectedRack"
        :options="optionsRack"
        label="Rack"
        layout="vertical"
      />
      <base-datepicker label="Issued Date" v-model="issued_date" />
      <base-datepicker label="Expired Date" v-model="expired_date" />
      <base-textarea label="Notes" v-model="notes" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
