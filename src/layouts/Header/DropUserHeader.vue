<script setup lang="ts">
import { NAvatar } from 'naive-ui'
import { ref } from 'vue'
import avatar from '@/assets/avatar_default.png'

interface Props {
  size: number
  fontSize: number
}
withDefaults(defineProps<Props>(), {
  size: 48,
  fontSize: 16,
})

const username = ref<string>('可爱哈基米')
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center py-2">
    <div class="pb-1">
      <NAvatar :size="size" :src="avatar" round />
    </div>
    <div
      class="user-name" :style="{
        fontSize: `${fontSize}px`,
      }"
    >
      <span class="text-black">
        {{ username }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
