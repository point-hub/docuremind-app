<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import type { IFormError } from './form'
import { useGetOwnersApi } from './retrieve-all-owner.api'
import { useGetVaultsApi } from './retrieve-all-vault.api'

const cover = defineModel('cover')
const cover_url = defineModel<string>('cover_url')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const document_files = defineModel<any[]>('document_files', { default: [] })
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const new_files = defineModel<any[]>('new_files', { default: [] })
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

  selectedOwner.value = owner.value
  selectedVault.value = vault.value

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedVault.value = vaults.value?.data.find((option: any) => {
    return option._id === vault?.value?._id
  })
  selectedType.value = optionsType.find((option) => option._id === type.value)
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedRack.value = optionsRack.value.find((option: any) => {
      return option.name === rack.value?.label
    })
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

interface HTMLInputEvent extends Event {
  target: HTMLInputElement
}

const onUpload = (e: HTMLInputEvent) => {
  if (e.target.files && e.target.files[0]) {
    cover.value = e.target.files[0]
  }
}

const onUploadFile = (i: number, e: HTMLInputEvent) => {
  if (e.target.files && e.target.files[0]) {
    new_files.value = [...new_files.value, e.target.files[0]]
    previewImage(i, e)
  }
}

const onRemoveFile = (i: number) => {
  document_files.value.splice(i, 1)
}

const onRemoveNewFile = (i: number) => {
  imageUrl.value.splice(i, 1)
  new_files.value.splice(i, 1)
}

const imageUrl = ref<string[]>([])
const previewImage = (i: number, event: Event) => {
  console.log(i)
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return

  const file = target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageUrl.value[i] = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <base-card>
    <template #header>Documents</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-form label="Cover">
        <div>
          <base-file-upload @change="onUpload" accept="image/*" />
          <img v-if="cover_url" :src="cover_url" alt="" class="md:w-320px" />
        </div>
      </base-form>
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
      <base-textarea label="Notes" v-model="notes" minHeight="120" />
    </div>
  </base-card>
  <base-card>
    <template #header>Document Files</template>
    <div class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      <div
        border="none"
        class="bg-slate-200 col-span-1"
        v-for="(documentFile, index) in document_files"
        :key="index"
      >
        <div class="relative w-full">
          <base-button size="sm" class="w-full">
            <div
              class="text-sm font-semibold text-gray-500 flex-1 h-60 flex flex-col items-center justify-center w-full bg-slate-200"
            >
              <a
                v-if="documentFile.url && documentFile.mime?.includes('image')"
                :href="documentFile.url"
                target="_blank"
              >
                <img :src="documentFile.url" class="max-w-48 max-h-60 w-full" />
              </a>
              <a
                v-else-if="documentFile.url && documentFile.mime?.includes('pdf')"
                :href="documentFile.url"
                target="_blank"
              >
                <base-icon icon="i-fas-file-pdf" class="w-100px h-100px" />
              </a>
            </div>
          </base-button>
          <base-button
            v-if="index !== document_files.length"
            type="button"
            size="xs"
            class="absolute right-2 top-2 rounded-full border-white bg-white px-2.5 py-1 opacity-50 shadow"
            @click="onRemoveFile(index)"
          >
            X
          </base-button>
        </div>
      </div>
      <base-file-upload
        v-for="(i, index) in imageUrl.length + 1"
        :key="i"
        @change="onUploadFile(index, $event)"
        border="none"
        accept="application/pdf, image/*"
        class="bg-slate-200 col-span-1"
      >
        <template v-slot="{ fileRef }">
          <div class="relative w-full">
            <base-button size="sm" @click="fileRef.click()" class="w-full">
              <div
                class="text-sm font-semibold text-gray-500 flex-1 h-60 flex flex-col items-center justify-center w-full bg-slate-200"
              >
                <img
                  v-if="imageUrl[index] && new_files[index].type.includes('image')"
                  :src="imageUrl[index]"
                  class="max-w-48 max-h-60 w-full"
                />
                <div v-if="imageUrl[index] && new_files[index].type.includes('pdf')">
                  <base-icon icon="i-fas-file-pdf" class="w-100px h-100px" />
                </div>
                <div
                  v-if="!imageUrl[index]"
                  class="flex flex-col gap-2 items-center justify-center w-full h-full"
                >
                  <base-icon icon="i-fad-file-import" class="w-12 h-12"></base-icon>
                  <div>Choose File</div>
                </div>
              </div>
            </base-button>
            <base-button
              v-if="index !== imageUrl.length"
              type="button"
              size="xs"
              class="absolute right-2 top-2 rounded-full border-white bg-white px-2.5 py-1 opacity-50 shadow"
              @click="onRemoveNewFile(index)"
            >
              X
            </base-button>
          </div>
        </template>
      </base-file-upload>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
