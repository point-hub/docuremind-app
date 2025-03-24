<script setup lang="ts">
export interface IBreadcrumb {
  name: string
  path?: string
}

interface IProps {
  breadcrumbs: IBreadcrumb[]
}

const props = defineProps<IProps>()
</script>

<template>
  <base-card class="py-3!">
    <base-breadcrumb :items="props.breadcrumbs" separator="angle" v-slot="{ item }">
      <router-link v-if="item.path" :to="item.path">
        {{ item.name }}
      </router-link>
      <span v-else>{{ item.name }}</span>
    </base-breadcrumb>
  </base-card>
</template>

<style scoped lang="postcss"></style>
