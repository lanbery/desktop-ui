<script setup lang="ts">
import { ref } from 'vue'
import SigninForm from './SigninForm.vue'
import SignupForm from './SignupForm.vue'

const tab = ref<number>(1)

function onTabClick(val: number) {
  tab.value = val
}
</script>

<template>
  <div class="sign-form-container w-full rounded-3xl p-6 bg-white bg-opacity-20">
    <div class="form-tab flex justify-center items-center h-24">
      <div
        class="tab-signin flex-1 flex flex-col justify-center items-center space-y-2 text-lg cursor-pointer"
        @click="onTabClick(1)"
      >
        <span
          :class="{
            'text-xl': tab === 1,
            'text-main': tab === 1,
          }"
        >
          登录
        </span>
        <div v-if="tab === 1" class="tab-underline h-1 bg-main w-5" />
      </div>
      <div
        class="tab-signup flex-1 flex flex-col justify-center items-center space-y-2 text-lg cursor-pointer"
        @click="onTabClick(2)"
      >
        <span
          :class="{
            'text-xl': tab === 2,
            'text-main': tab === 2,
          }"
        >
          注册
        </span>
        <div v-if="tab === 2" class="tab-underline h-1 bg-main w-5" />
      </div>
    </div>
    <div class="form-container">
      <SigninForm v-if="tab === 1" />
      <SignupForm v-else />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sign-form-container {
  min-height: 510px;
}
</style>
