<script setup lang="ts">
import { NAvatar } from 'naive-ui'
import logo from '@/assets/icon/logo.png'
</script>

<template>
  <header class="bg-default-light dark:bg-default-dark sticky top-0 z-50 h-20 w-full flex items-center justify-between border-y border-gray-300 p-2 dark:border-gray-950 sm:p-4">
    <div class="px-24 w-full">
      <div class="logo-wrapper flex items-center">
        <NAvatar :src="logo" :size="60" round preview-disabled />
        <h1>文广天书</h1>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss"></style>
