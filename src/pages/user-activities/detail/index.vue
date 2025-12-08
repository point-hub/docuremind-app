<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardAction from './card-action.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetUserApi } from './retrieve.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const getUserApi = useGetUserApi()

const form = reactive(useForm())

const formId = ref()

onMounted(async () => {
  if (authStore.role !== 'admin') {
    router.push('/unauthorized')
  }

  const response = await getUserApi.send(route.params.id.toString())

  if (response) {
    formId.value = response._id
    form.data.username = response.username
    form.data.email = response.email
    form.data.name = response.name
    form.data.role = response.role
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-action :data="form.data" />

    <card-form
      :form-id="route.params.id.toString()"
      v-model:username="form.data.username"
      v-model:email="form.data.email"
      v-model:name="form.data.name"
      v-model:role="form.data.role"
    />
  </div>
</template>
