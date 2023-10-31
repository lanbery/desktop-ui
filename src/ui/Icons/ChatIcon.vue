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
    <svg
      viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
      width="200" height="200"
    >
      <path d="M510.4 63.2c-212 0-384 172-384 384 0 184.8 131.2 340 305.6 376l80 138.4 80-138.4C764.8 785.6 894.4 632 894.4 448c0-212.8-172-384.8-384-384.8zM319.2 512c-35.2 0-64-28.8-64-64s28.8-64 64-64 64 28.8 64 64-28.8 64-64 64zM512 512c-35.2 0-64-28.8-64-64s28.8-64 64-64 64 28.8 64 64-28.8 64-64 64z m191.2 0c-35.2 0-64-28.8-64-64s28.8-64 64-64 64 28.8 64 64-28.8 64-64 64z" />
    </svg>
  </NIcon>
</template>

<style scoped lang="scss"></style>
