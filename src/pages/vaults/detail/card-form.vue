<script setup lang="ts">
const code = defineModel<string>('code')
const name = defineModel<string>('name')
</script>

<template>
  <base-card>
    <template #header>Vaults</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input disabled v-model="code" label="Code" />
      <base-input disabled v-model="name" label="Name" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
