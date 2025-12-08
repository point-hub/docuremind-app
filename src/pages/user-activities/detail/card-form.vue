<script setup lang="ts">
const username = defineModel<string>('username')
const email = defineModel<string>('email')
const name = defineModel<string>('name')
const role = defineModel<string>('role')
</script>

<template>
  <base-card>
    <template #header>Users</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input disabled v-model="username" label="Username" />
      <base-input disabled v-model="email" label="Email" />
      <base-input disabled v-model="name" label="Name" />
      <base-input disabled v-model="role" label="Role" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
