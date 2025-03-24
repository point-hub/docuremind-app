<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardAction from './card-action.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import CardRack from './card-rack.vue'
import { useForm } from './form'
import { useGetVaultApi } from './get.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getVaultApi = useGetVaultApi()

const form = reactive(useForm())

const formId = ref()

onMounted(async () => {
  if (authStore.role !== 'admin') {
    router.push('/unauthorized')
  }

  const response = await getVaultApi.send(route.params.id.toString())

  if (response) {
    formId.value = response._id
    form.data.code = response.code
    form.data.name = response.name
    form.data.racks = response.racks
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-action :data="form.data" />
    <card-form
      :form-id="route.params.id.toString()"
      v-model:code="form.data.code"
      v-model:name="form.data.name"
    />
    <card-rack :form-id="route.params.id.toString()" v-model:racks="form.data.racks" />
  </div>
</template>
