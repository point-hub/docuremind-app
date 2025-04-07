<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardAction from './card-action.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { useGetDocumentApi } from './retrieve.api'

const route = useRoute()
const authStore = useAuthStore()
const getDocumentApi = useGetDocumentApi()

const form = reactive(useForm())

const formId = ref()

onMounted(async () => {
  const response = await getDocumentApi.send(route.params.id.toString())

  if (response) {
    formId.value = response._id
    form.data = response
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-action :data="form.data" v-if="authStore.role === 'admin'" />
    <card-form
      :form-id="route.params.id.toString()"
      :cover_url="form.data.cover_url"
      :code="form.data.code"
      :name="form.data.name"
      :type="form.data.type"
      :owner="form.data.owner?.label"
      :vault="form.data.vault?.label"
      :rack="form.data.rack"
      :issued_date="form.data.issued_date"
      :expired_date="form.data.expired_date"
      :notes="form.data.notes"
      :status="form.data.status"
    />
  </div>
</template>
