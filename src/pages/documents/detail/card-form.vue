<script setup lang="ts">
const name = defineModel<string>('name')
</script>

<template>
  <base-card>
    <template #header>Documents</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input disabled v-model="name" label="Name" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
