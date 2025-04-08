<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import DeleteModal from './components/delete/delete-modal.vue'
import { useGetDocumentsApi } from './retrieve-all.api'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const deleteModalRef = ref()
const getDocumentsApi = useGetDocumentsApi()

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
  rack: string
  expired_date: string
  return_due_date: string
  status: string
}

const searchAll = ref('')
const search = ref({
  name: ''
})
const documents = ref<IDocument[]>()
const pagination = ref({
  page: 1,
  page_size: 10,
  total_document: 0
})
const isLoading = ref(false)
const rowMenuRef = ref()

const updateRouter = () => {
  router.push({
    path: '/documents',
    query: {
      search: searchAll.value,
      page: pagination.value.page,
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

const onDeleteModal = (document: IDocument, index: number) => {
  rowMenuRef.value[index].toggle(false)
  deleteModalRef.value.toggleModal(true, {
    id: document._id,
    name: `${document.name}`
  })
}

const onDelete = async () => {
  // call api
  const response = await getDocumentsApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  documents.value = response?.data
  pagination.value = response?.pagination
}
</script>

<template>
  <base-card>
    <template #header>To Do List</template>

    <div class="my-5 flex gap-2">
      <base-input v-model="searchAll" placeholder="Search..." border="full" class="w-full" />
    </div>
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th>Document</th>
            <th>Notes</th>
            <th>Expired Date</th>
            <th>Return Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="7">
              <p class="w-full h-32 flex items-center justify-center gap-2 text-center text-xl">
                <base-spinner color="primary" size="xs" /> <span>Loading</span>
              </p>
            </td>
          </tr>
          <template v-if="!isLoading">
            <!-- <tr v-for="(document, index) in documents" :key="index">
              <td>
                <router-link :to="`/documents/${document._id}`" class="text-blue">
                  [{{ document.code }}] {{ document.name }}
                </router-link>
              </td>
              <td>
                <template class="flex flex-col gap-2">
                  <p>
                    Dokumen akan expired pada tanggal 2025-01-01, klik
                    <base-button size="xs" variant="filled" shape="pill" color="primary"
                      >Edit</base-button
                    >
                    untuk update expired date dokumen
                  </p>
                  <p>
                    Dokumen [Nama Dokumen] yang dipinjam [Nama User] jatuh tempo pada tanggal
                    [Tanggal], klik
                    <base-button size="xs" variant="filled" shape="pill" color="primary"
                      >Return</base-button
                    >
                    jika sudah menerima pengembalian dokumen
                  </p>
                </template>
              </td>
              <td>{{ document.expired_date }}</td>
              <td>{{ document.return_due_date }}</td>
              <td>
                <base-badge variant="light">{{ document.status }}</base-badge>
              </td>
            </tr> -->
          </template>
        </tbody>
      </base-table>
      <base-pagination
        v-if="!isLoading"
        v-model="pagination.page"
        :page-size="pagination.page_size"
        :total-document="pagination.total_document"
        @update:model-value="onPageUpdate()"
      />
    </div>
    <delete-modal ref="deleteModalRef" @deleted="onDelete" />
  </base-card>
</template>

<style scoped lang="postcss"></style>
