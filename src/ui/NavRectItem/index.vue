<script setup lang="ts">
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
    class="w-full flex flex-start items-center space-x-4 py-6 ps-8" :class="{
      'bg-navitem-actived': actived,
    }"
  >
    <slot name="icon" />
    <div>
      <span>{{ title }} {{ actived }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
