<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: ''
})
</script>

<template>
  <base-card>
    <template #header>Documents</template>
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
              <th class="whitespace-nowrap">Document Code</th>
              <th class="whitespace-nowrap">Document Name</th>
              <th class="whitespace-nowrap">Owner</th>
              <th class="whitespace-nowrap">Vault</th>
              <th class="whitespace-nowrap">Rack</th>
              <th class="whitespace-nowrap">Status</th>
              <th class="whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A01</td>
              <td>Setifikat Tanah Bali</td>
              <td>Kartika</td>
              <td>Brankas 01</td>
              <td>Rack 01</td>
              <td>
                <base-badge variant="light" color="success" withDot class="whitespace-nowrap">
                  Available
                </base-badge>
              </td>
              <td class="flex gap-4">
                <base-button color="primary" size="xs">Borrow</base-button>
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
