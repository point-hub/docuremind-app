<script setup lang="ts">
const created_at = defineModel('created_at')
const created_by = defineModel('created_by')
const updated_at = defineModel('updated_at')
const updated_by = defineModel('updated_by')
</script>

<template>
  <base-card>
    <template #header>Metadata</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input disabled v-model="created_by" label="Created By" />
      <base-input disabled v-model="created_at" label="Created At" />
      <base-input v-if="updated_by" disabled v-model="updated_by" label="Updated By" />
      <base-input v-if="updated_at" disabled v-model="updated_at" label="Updated At" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
