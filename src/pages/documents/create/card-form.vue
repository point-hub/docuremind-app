<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import type { IFormError } from './form'
import { useGetOwnersApi } from './retrieve-all-owner.api'
import { useGetVaultsApi } from './retrieve-all-vault.api'

const cover = defineModel('cover')
const document = defineModel('document')
const code = defineModel<string>('code')
const name = defineModel<string>('name')
const type = defineModel<string>('type')
const owner = defineModel<IOption>('owner')
const vault = defineModel<IOption>('vault')
const rack = defineModel<IOption>('rack')
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
    rack.value = {
      _id: selectedRack.value?.code ?? '',
      label: selectedRack.value?.label ?? ''
    }
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

const onUploadFile = (e: HTMLInputEvent) => {
  if (e.target.files && e.target.files[0]) {
    document.value = e.target.files[0]
  }
}
</script>

<template>
  <base-card>
    <template #header>Documents</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-file-upload label="Cover" @change="onUpload" accept="image/*" :errors="errors?.cover" />
      <base-input required v-model="code" label="Code" :errors="errors?.code" />
      <base-input required v-model="name" label="Name" :errors="errors?.name" />
      <base-autocomplete
        required
        v-model="selectedType"
        :options="optionsType"
        label="Type"
        layout="vertical"
        :errors="errors?.type"
      />
      <base-autocomplete
        required
        v-model="selectedOwner"
        :options="owners?.data"
        label="Owner"
        layout="vertical"
        :errors="errors?.owner"
      />
      <base-autocomplete
        required
        v-model="selectedVault"
        :options="vaults?.data"
        label="Vault"
        layout="vertical"
        :errors="errors?.vault"
      />
      <base-autocomplete
        v-if="selectedVault"
        required
        v-model="selectedRack"
        :options="optionsRack"
        label="Rack"
        layout="vertical"
        :errors="errors?.rack"
      />
      <base-datepicker label="Issued Date" v-model="issued_date" />
      <base-datepicker label="Expired Date" v-model="expired_date" />
      <base-textarea label="Notes" v-model="notes" minHeight="120" />
    </div>
  </base-card>
  <base-card class="hidden">
    <template #header>Document Files</template>
    <div class="grid grid-cols-5 gap-4">
      <base-file-upload
        v-for="i in 2"
        :key="i"
        @change="onUploadFile"
        border="none"
        accept="application/pdf, image/*"
        multiple
      >
        <template v-slot="{ fileRef }">
          <base-button size="sm" @click="fileRef.click()">
            <div
              class="text-sm font-semibold text-gray-500 flex-1 shadow h-60 flex flex-col items-center justify-center w-48 bg-slate-200"
            >
              <div>
                <base-icon icon="i-fad-file-import" class="w-12 h-12"></base-icon>
              </div>
              <div>Choose File</div>
            </div>
          </base-button>
        </template>
      </base-file-upload>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
