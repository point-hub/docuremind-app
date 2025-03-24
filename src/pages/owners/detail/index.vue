<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardAction from './card-action.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetOwnerApi } from './get-owner.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getOwnerApi = useGetOwnerApi()

const form = reactive(useForm())

const formId = ref()

onMounted(async () => {
  if (authStore.role !== 'admin') {
    router.push('/unauthorized')
  }

  const response = await getOwnerApi.send(route.params.id.toString())

  if (response) {
    formId.value = response._id
    form.data.name = response.name
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-action :data="form.data" />
    <card-form :form-id="route.params.id.toString()" v-model:name="form.data.name" />
  </div>
</template>
