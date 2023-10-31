<script setup lang="ts">
import { NIcon } from 'naive-ui'

interface Props {
  size: number
  title: string
  actived: boolean
  icon?: string
}

withDefaults(defineProps<Props>(), {
  size: 36,
  actived: false,
})
</script>

<template>
  <div
    class="w-full flex flex-start items-center space-x-3 ps-10 cursor-pointer" :class="{
      'bg-navitem-actived': actived,
    }"

    :style="{
      height: `${size + 30}px`,
    }"
  >
    <NIcon v-if="icon" :size="size">
      <img :src="icon">
    </NIcon>

    <div class="text-lg">
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
