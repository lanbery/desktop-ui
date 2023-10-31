<script setup lang="ts">
import type { Component } from 'vue'
import { NButton } from 'naive-ui'

interface Props {
  label?: string
  icon?: Component
  width?: number
  selected?: boolean
}

withDefaults(defineProps<Props>(), {
  label: 'Button',
  selected: false,
})
</script>

<template>
  <NButton class="ai-button-wrapper">
    {{ h(icon) }}

    {{ label }}
  </NButton>
</template>

<style scoped lang="scss"></style>
