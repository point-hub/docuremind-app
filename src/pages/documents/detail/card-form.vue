<script setup lang="ts">
const cover_url = defineModel<string>('cover_url')
const document_url = defineModel<string>('document_url')
const document_mime = defineModel<string>('document_mime')
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
      <base-form label="Document File">
        <a
          v-if="document_url && document_mime?.includes('image')"
          :href="document_url"
          target="_blank"
        >
          <img :src="document_url" alt="" class="md:w-320px" />
        </a>
        <a
          v-else-if="document_url && document_mime?.includes('pdf')"
          :href="document_url"
          target="_blank"
        >
          <base-icon icon="i-fas-file-pdf" class="w-100px h-100px" />
        </a>
      </base-form>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
