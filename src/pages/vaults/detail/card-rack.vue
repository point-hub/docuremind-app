<script setup lang="ts">
const racks = defineModel<{ code: string; name: string }[]>('racks')
</script>

<template>
  <base-card>
    <template #header>Racks</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rack in racks" :key="rack.code">
            <td>{{ rack.code }}</td>
            <td>{{ rack.name }}</td>
          </tr>
        </tbody>
      </base-table>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
