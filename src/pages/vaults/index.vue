<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: ''
})
</script>

<template>
  <base-card>
    <template #header>Vaults</template>
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
              <th class="whitespace-nowrap">Vault Code</th>
              <th class="whitespace-nowrap">Vault Name</th>
              <th class="whitespace-nowrap">Rack Code</th>
              <th class="whitespace-nowrap">Rack Name</th>
              <th class="whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A01</td>
              <td>Brankas 01</td>
              <td>B01R01</td>
              <td>Rack 01</td>
              <td>
                <base-button color="primary" size="xs">Edit</base-button>
              </td>
            </tr>
            <tr>
              <td>A02</td>
              <td>Brankas 02</td>
              <td>B01R01</td>
              <td>Rack 02</td>
              <td>
                <base-button color="primary" size="xs">Edit</base-button>
              </td>
            </tr>
            <tr>
              <td>A03</td>
              <td>Brankas 03</td>
              <td>B01R03</td>
              <td>Rack 03</td>
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
