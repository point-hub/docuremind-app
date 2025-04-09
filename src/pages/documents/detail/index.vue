<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardAction from './card-action.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import CardMeta from './card-meta.vue'
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
      :document="form.data.document"
      :document_url="form.data.document_url"
      :document_mime="form.data.document_mime"
      :code="form.data.code"
      :name="form.data.name"
      :type="form.data.type"
      :owner="form.data.owner?.label"
      :vault="form.data.vault?.label"
      :rack="form.data.rack?.label"
      :issued_date="form.data.issued_date"
      :expired_date="form.data.expired_date"
      :notes="form.data.notes"
      :status="form.data.status"
    />

    <card-meta
      :created_at="form.data.created_at"
      :created_by="form.data.created_by"
      :updated_at="form.data.updated_at"
      :updated_by="form.data.updated_by"
    />
  </div>
</template>
