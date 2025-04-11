<script setup lang="ts">
const cover_url = defineModel<string>('cover_url')
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const document_files = defineModel<any[]>('document_files', { default: [] })
const code = defineModel<string>('code')
const name = defineModel<string>('name')
const type = defineModel<string>('type')
const owner = defineModel<string>('owner')
const vault = defineModel<string>('vault')
const rack = defineModel<string>('rack')
const issued_date = defineModel<string>('issued_date')
const expired_date = defineModel<string>('expired_date')
const notes = defineModel<string>('notes')
const status = defineModel<string>('status')
</script>

<template>
  <base-card>
    <template #header>Documents</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-form label="Cover" v-if="cover_url">
        <img :src="cover_url" alt="" class="md:w-320px" />
      </base-form>
      <base-input disabled v-model="code" label="Code" />
      <base-input disabled v-model="name" label="Name" />
      <base-input disabled v-model="type" label="Type" />
      <base-input disabled v-model="owner" label="Owner" />
      <base-input disabled v-model="vault" label="Vault" />
      <base-input disabled v-model="rack" label="Rack" />
      <base-input disabled v-model="status" label="Status" />
      <base-textarea disabled v-model="notes" label="Notes" />
      <base-datepicker disabled v-model="issued_date" label="Issued Date" />
      <base-datepicker disabled v-model="expired_date" label="Expired Date" />
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
        </div>
      </div>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
