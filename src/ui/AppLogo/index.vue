<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size: number
  name: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 80,
  name: '',
})

const logoStyle = computed(() => {
  const size = props.size
  return `width:${size}px;height:${size}px`
})
</script>

<template>
  <div class="w-full flex flex-col just-center items-center">
    <div class="bg-ts-logo bg-cover" :style="logoStyle" />
    <div class="title-wrapper text-center pt-4">
      <span class="text-4xl">
        {{ name }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
