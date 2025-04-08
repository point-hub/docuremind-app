<script setup lang="ts">
import type { IFormError } from './form'

const user = defineModel<string>('user')
const document = defineModel<string>('document')
const required_date = defineModel<string>('required_date')
const return_due_date = defineModel<string>('return_due_date')
const reason_for_borrowing = defineModel<string>('reason_for_borrowing')
const errors = defineModel<IFormError>('errors')
</script>

<template>
  <base-card>
    <template #header>Borrow Document</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input disabled required v-model="user" label="User" :errors="errors?.user" />
      <base-input
        disabled
        required
        v-model="document"
        label="Document"
        :errors="errors?.document"
      />
      <base-datepicker required label="Required Date" v-model="required_date" />
      <base-datepicker required label="Return Due Date" v-model="return_due_date" />
      <base-textarea
        required
        label="Reason for Borrowing"
        v-model="reason_for_borrowing"
        minHeight="120"
      />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
