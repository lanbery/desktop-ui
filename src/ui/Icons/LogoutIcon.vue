<script setup lang="ts">
import { NIcon } from 'naive-ui'

interface Props {
  size: number
  color: string
}

withDefaults(defineProps<Props>(), {
  size: 24,
  color: '#ccc',
})
</script>

<template>
  <NIcon :size="size" :color="color">
    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <path d="M972.8 512l-307.2-256 0 153.6-358.4 0 0 204.8 358.4 0 0 153.6 307.2-256zM153.6 153.6l409.6 0 0-102.4-409.6 0c-56.32 0-102.4 46.08-102.4 102.4l0 716.8c0 56.32 46.08 102.4 102.4 102.4l409.6 0 0-102.4-409.6 0 0-716.8z" />
    </svg>
  </NIcon>
</template>

<style scoped lang="scss"></style>
