<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useGetActivitiesApi } from './retrieve-all.api'
import { useGetUsersApi } from './retrieve-all-user.api'

const route = useRoute()
const router = useRouter()
const getActivitiesApi = useGetActivitiesApi()
const getUsersApi = useGetUsersApi()


interface IUser {
  _id: string
  username: string
  name: string
  email: string
  role: string
}

const searchAll = ref('')
const search = ref({
  name: ''
})
const activities = ref<IUser[]>()
const pagination = ref({
  page: 1,
  page_size: 10,
  total_document: 0
})
const isLoading = ref(false)

const updateRouter = () => {
  router.push({
    path: '/user-activities',
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
    const response = await getActivitiesApi.send(
      { all: searchAll.value, ...search.value },
      pagination.value.page
    )
    activities.value = response?.data
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
    const response = await getActivitiesApi.send(
      { all: searchAll.value, ...search.value },
      pagination.value.page
    )
    activities.value = response?.data
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
  const response = await getActivitiesApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  activities.value = response?.data
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
  const response = await getActivitiesApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  activities.value = response?.data
  pagination.value = response?.pagination

  // call api
  const responseUser = await getUsersApi.send(
    { all: searchAll.value, ...search.value },
    pagination.value.page
  )
  users.value = responseUser?.data

  users.value = users?.value?.map((obj: any) => {
    return { ...obj, label: obj.name }
  })
})

const selectedUser = ref()
const users = ref()
watch(
  () => selectedUser.value,
  async () => {
    searchAll.value = route.query.search?.toString() ?? ''
    search.value.name = route.query['search.name']?.toString() ?? ''
    pagination.value.page = Number(route.query.page ?? 1)
    // call api
    const response = await getActivitiesApi.send(
      {
        all: searchAll.value,
        user_id: selectedUser.value?._id,
        ...search.value
      },
      pagination.value.page
    )
    activities.value = response?.data
    pagination.value = response?.pagination

  },
  { deep: true }
)
</script>

<template>
  <base-card>
    <template #header>User Activity</template>

    <div class="my-5 flex gap-2">
      <base-select v-model="selectedUser" :options="users" />
      <base-input v-model="searchAll" placeholder="Search..." border="full" class="w-full" />
    </div>
    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th>User</th>
            <th>Activity</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="5">
              <p class="w-full h-32 flex items-center justify-center gap-2 text-center text-xl">
                <base-spinner color="primary" size="xs" /> <span>Loading</span>
              </p>
            </td>
          </tr>
          <template v-if="!isLoading">
            <tr v-for="(activity, index) in activities" :key="index">
              <td>
                {{ activity.user.label }}
              </td>
              <td>{{ activity.notes }}</td>
              <td>
                {{ new Date(activity.date).getFullYear() }}-{{ new Date(activity.date).getMonth() + 1 }}-{{ String(new
                  Date(activity.date).getDate()).padStart(2, "0") }}, {{ String(new
                  Date(activity.date).getHours()).padStart(2, "0") }}:{{ String(new
                  Date(activity.date).getMinutes()).padStart(2, "0") }}
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
