<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import DeleteModal from '../components/delete/delete-modal.vue'
import { useGetOwnersApi } from './retrieve-all.api'

const route = useRoute()
const router = useRouter()
const deleteModalRef = ref()
const getOwnersApi = useGetOwnersApi()

interface IOwner {
  _id: string
  name: string
}

const searchAll = ref('')
const search = ref({
  name: ''
})
const owners = ref<IOwner[]>()
const pagination = ref({
  page: 1,
  page_size: 10,
  total_document: 0
})
const isLoading = ref(false)
const rowMenuRef = ref()

const updateRouter = () => {
  router.push({
    path: '/owners',
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
    const response = await getOwnersApi.send(
      { all: searchAll.value, ...search.value },
      pagination.value.page
    )
    owners.value = response?.data
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
    const response = await getOwnersApi.send(
      { all: searchAll.value, ...search.value },
      pagination.value.page
    )
    owners.value = response?.data
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
  const response = await getOwnersApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  owners.value = response?.data
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
  const response = await getOwnersApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  owners.value = response?.data
  pagination.value = response?.pagination
})

const onDeleteModal = (owner: IOwner, index: number) => {
  rowMenuRef.value[index].toggle(false)
  deleteModalRef.value.toggleModal(true, {
    id: owner._id,
    name: `${owner.name}`
  })
}

const onDelete = async () => {
  // call api
  const response = await getOwnersApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  owners.value = response?.data
  pagination.value = response?.pagination
}
</script>

<template>
  <base-card>
    <template #header>Owners</template>

    <div class="my-5 flex gap-2">
      <router-link to="/owners/create">
        <base-button color="info" shape="sharp">Create</base-button>
      </router-link>
      <base-input v-model="searchAll" placeholder="Search..." border="full" class="w-full" />
    </div>
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-1"></th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="2">
              <p class="w-full h-32 flex items-center justify-center gap-2 text-center text-xl">
                <base-spinner color="primary" size="xs" /> <span>Loading</span>
              </p>
            </td>
          </tr>
          <template v-if="!isLoading">
            <tr v-for="(owner, index) in owners" :key="index">
              <td>
                <base-popover placement="bottom" ref="rowMenuRef">
                  <base-button size="xs" @click="rowMenuRef[index].toggle()">
                    <base-icon class="text-xl" icon="i-ph-dots-three-bold"></base-icon>
                  </base-button>
                  <template #content>
                    <base-card class="p-0! gap-0!">
                      <div class="flex flex-col">
                        <router-link :to="`/owners/${owner._id}`">
                          <base-button
                            variant="text"
                            color="info"
                            class="w-full py-1! px-3! m-0! flex items-center justify-start text-left!"
                          >
                            <base-icon class="flex-0" icon="i-fad-file"></base-icon>
                            <p class="flex-1">View</p>
                          </base-button>
                        </router-link>
                        <base-divider orientation="vertical" class="my-0!"></base-divider>
                        <base-button
                          variant="text"
                          color="danger"
                          class="w-full py-1! px-3! m-0! flex items-center justify-start text-left!"
                          @click="onDeleteModal(owner, index)"
                        >
                          <base-icon class="flex-0" icon="i-fad-trash"></base-icon>
                          <p class="flex-1">Delete</p>
                        </base-button>
                      </div>
                    </base-card>
                  </template>
                </base-popover>
              </td>
              <td>
                <router-link :to="`/owners/${owner._id}`" class="text-blue">
                  {{ owner.name }}
                </router-link>
              </td>
            </tr>
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
