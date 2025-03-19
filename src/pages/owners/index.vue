<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: ''
})
</script>

<template>
  <base-card>
    <template #header>Owners</template>
    <div class="flex flex-col gap-4">
      <div class="flex gap-4">
        <base-input required v-model="form.name" placeholder="Search..." class="flex-1">
          <template #prefix>
            <base-icon icon="i-far-magnifying-glass mx-2" />
          </template>
        </base-input>
        <base-button variant="filled" color="primary">Create</base-button>
      </div>
      <div>
        <base-table>
          <thead>
            <tr>
              <th class="whitespace-nowrap">Name</th>
              <th class="whitespace-nowrap w-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kartika</td>
              <td>
                <base-button color="primary" size="xs">Edit</base-button>
              </td>
            </tr>
            <tr>
              <td>Stefani</td>
              <td>
                <base-button color="primary" size="xs">Edit</base-button>
              </td>
            </tr>
            <tr>
              <td>Edwin</td>
              <td>
                <base-button color="primary" size="xs">Edit</base-button>
              </td>
            </tr>
          </tbody>
        </base-table>
      </div>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
