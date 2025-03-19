<script setup lang="ts">
import { BaseButton, BaseCard, BaseCheckbox, BaseInput } from '@point-hub/papp'
import { ref } from 'vue'

const form = ref({
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  accept: false
})

const passwordType = ref<'text' | 'password'>('password')

const toggleRevealPassword = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}
</script>

<template>
  <component :is="BaseCard" class="max-w-xl">
    <form @submit.prevent="" class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <component :is="BaseInput" v-model="form.email" label="Email" layout="vertical" autofocus />
        <component :is="BaseInput" v-model="form.username" label="Username" layout="vertical" />
        <component
          :is="BaseInput"
          :type="passwordType"
          v-model="form.password"
          label="Password"
          layout="vertical"
        >
          <template #suffix>
            <BaseButton @click="toggleRevealPassword" variant="text" color="secondary">
              <BaseIcon icon="i-far-eye" />
            </BaseButton>
          </template>
        </component>
        <component
          :is="BaseInput"
          :type="passwordType"
          v-model="form.confirmPassword"
          label="Confirm Password"
          layout="vertical"
        >
          <template #suffix>
            <BaseButton @click="toggleRevealPassword" variant="text" color="secondary">
              <BaseIcon icon="i-far-eye" />
            </BaseButton>
          </template>
        </component>
        <div class="flex items-center">
          <component :is="BaseCheckbox" v-model="form.accept" />
          <p>Accept <a href="#">Privacy</a> & <a href="#">Terms</a></p>
        </div>
      </div>
      <component :is="BaseButton" color="primary">Sign Up</component>
    </form>
    <div class="mt-4">
      Already have an account ? <router-link to="/signin">Sign In</router-link>
    </div>
  </component>
</template>

<style scoped lang="postcss"></style>
