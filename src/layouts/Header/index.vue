<script setup lang="ts">
import { NIcon, NImage } from 'naive-ui'
import SignDropdown from './SignDropdown.vue'
import logo from '@/assets/logo_small.png'
import appTitle from '@/assets/images/app_title.png'
</script>

<template>
  <header
    class="bg-default-light dark:bg-default-dark sticky top-0 z-50 h-20 w-full flex items-center justify-between border-y border-gray-300 p-2 dark:border-gray-950 sm:p-4"
  >
    <div class="px-24 w-full flex justify-between items-center">
      <div class="logo-wrapper flex items-center space-x-2">
        <NIcon :size="60">
          <img :src="logo">
        </NIcon>
        <NImage :src="appTitle" preview-disabled />
      </div>
      <SignDropdown />
    </div>
  </header>
</template>

<style scoped lang="scss"></style>
