<script setup lang="ts">
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
</template>

<style scoped lang="postcss"></style>
