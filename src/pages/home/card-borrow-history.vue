<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { inject, onMounted, type Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { IToastRef } from '@/main-app.vue'
import { useAuthStore } from '@/stores/auth.store'
import { handleError } from '@/utils/api'

import { useGetDocumentsApi } from './retrieve-borrow-history.api'
import { useReturnDocumentApi } from './return.api'

const route = useRoute()
const router = useRouter()
const getDocumentsApi = useGetDocumentsApi()
const returnDocumentApi = useReturnDocumentApi()
const authStore = useAuthStore()

interface IDocument {
  _id: string
  code: string
  name: string
  type: string
  owner: {
    _id: string
    label: string
  }
  vault: {
    _id: string
    label: string
  }
  rack: {
    _id: string
    label: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  borrow: any
  issued_date: string
  expired_date: string
  status: string
  requested_at: string
  requested_by: {
    _id: string
    label: string
  }
  required_date: string
  return_due_date: string
  reason_for_borrowing: string
}

const searchAll = ref('')
const search = ref({
  code: '',
  name: ''
})
const documents = ref<IDocument[]>()
const pagination = ref({
  page: 1,
  page_size: 10,
  total_document: 0
})
const isLoading = ref(false)

const updateRouter = () => {
  router.push({
    path: '/home',
    query: {
      search: searchAll.value,
      page: pagination.value.page,
      'search.code': search.value.code,
      'search.name': search.value.name
    }
  })
}

watchDebounced(
  searchAll,
  async () => {
    // start loading
    isLoading.value = true
    // reset page 1
    pagination.value.page = 1
    // call api
    const response = await getDocumentsApi.send(
      { all: searchAll.value, ...search.value },
      pagination.value.page
    )
    documents.value = response?.data
    pagination.value = response?.pagination
    // update url query params
    updateRouter()
    // finish loading
    isLoading.value = false
  },
  { debounce: 500, maxWait: 1000 }
)

watchDebounced(
  search.value,
  async () => {
    // start loading
    isLoading.value = true
    // reset page 1
    pagination.value.page = 1
    // call api
    const response = await getDocumentsApi.send(
      { all: searchAll.value, ...search.value },
      pagination.value.page
    )
    documents.value = response?.data
    pagination.value = response?.pagination
    // update url query params
    updateRouter()
    // finish loading
    isLoading.value = false
  },
  { debounce: 500, maxWait: 1000 }
)

// Section Pagination
const onPageUpdate = async () => {
  // call api
  const response = await getDocumentsApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  documents.value = response?.data
  pagination.value = response?.pagination
  // update url query params
  updateRouter()
}

onMounted(async () => {
  // set default value
  searchAll.value = route.query.search?.toString() ?? ''
  search.value.name = route.query['search.name']?.toString() ?? ''
  pagination.value.page = Number(route.query.page ?? 1)
  // call api
  const response = await getDocumentsApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  documents.value = response?.data
  pagination.value = response?.pagination
})
const toastRef = inject<Ref<IToastRef>>('toastRef')
const onReturn = async (document: IDocument) => {
  try {
    const res = await returnDocumentApi.send(document.borrow._id, document._id)
    if (res?.modified_count === 1) {
      toastRef?.value.toast(
        `Pengembalian dokumen "[${document.code}] ${document.name}" telah di proses`,
        {
          color: 'success'
        }
      )
      // call api
      const response = await getDocumentsApi.send(
        { all: searchAll.value, ...search.value },
        pagination.value.page
      )
      documents.value = response?.data
      pagination.value = response?.pagination
    }
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.message) {
      toastRef?.value.toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger'
      })
    }
  }
}
</script>

<template>
  <base-card>
    <template #header>Borrowing History</template>
    <div class="my-5 flex gap-2">
      <base-input v-model="searchAll" placeholder="Search..." border="full" class="w-full" />
    </div>
    <div class="flex flex-col gap-4">
      <base-table>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="7">
              <p class="w-full h-32 flex items-center justify-center gap-2 text-center text-xl">
                <base-spinner color="primary" size="xs" /> <span>Loading</span>
              </p>
            </td>
          </tr>
          <template v-if="!isLoading">
            <tr v-for="(document, index) in documents" :key="index">
              <td>
                <template class="flex flex-col gap-2">
                  <p>
                    Permintaan pinjam dokumen
                    <b>
                      <router-link :to="`/documents/${document._id}`" class="text-blue">
                        [{{ document.code }}] {{ document.name }}
                      </router-link>
                    </b>
                    tanggal
                    <b>{{ document.borrow.required_date }}</b>
                    oleh <b>{{ document.borrow.requested_by.label }}</b> untuk
                    <b>{{ document.borrow.reason_for_borrowing }}</b>
                  </p>
                  <span v-if="
                    document.borrow.return_due_date < new Date().toISOString() &&
                    document.borrow.status === 'approved'
                  ">
                    <span class="bg-red-500 text-white px-1">Overdue: {{ document.borrow.return_due_date }}</span>
                  </span>
                </template>
              </td>
              <td class="w-1">
                <div class="flex gap-2">
                  <base-button v-if="
                    document.borrow.requested_by._id === authStore._id &&
                    document.borrow.status === 'approved'
                  " size="xs" variant="filled" color="primary" @click="onReturn(document)">
                    Return
                  </base-button>
                </div>
              </td>
              <td class="w-1">
                <base-badge v-if="document.borrow.status === 'returning'" variant="light"
                  color="warning">Returning</base-badge>
                <base-badge v-if="document.borrow.status === 'returned'" variant="light"
                  color="success">Returned</base-badge>
                <base-badge v-if="document.borrow.status === 'pending'" variant="light"
                  color="info">Pending</base-badge>
                <base-badge v-if="document.borrow.status === 'approved'" variant="light"
                  color="success">Approved</base-badge>
                <base-badge v-if="document.borrow.status === 'rejected'" variant="light"
                  color="danger">Rejected</base-badge>
              </td>
            </tr>
          </template>
        </tbody>
      </base-table>
      <base-pagination v-if="!isLoading" v-model="pagination.page" :page-size="pagination.page_size"
        :total-document="pagination.total_document" @update:model-value="onPageUpdate()" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
