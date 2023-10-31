<script setup lang="ts">
import { h, reactive, ref } from 'vue'
import { NButton, NSpace } from 'naive-ui'
import { ChatIcon, ChefIcon, EnglishIcon, HeartIcon, LawyerIcon } from '../Icons'

const config = reactive({
  icon: {
    size: 20,
    color: '#432fff',
  },
  color: '#432ff',
  activeBorder: '0px solid',
  border: '1px solid #ffffff',
})

const buttons = ref([
  {
    uuid: 2001,
    label: '文案编写',
    renderIcon: () => h(ChatIcon, { ...config.icon }),
    selected: false,
  },
  {
    uuid: 2002,
    label: '英语助手',
    renderIcon: () => h(EnglishIcon, { ...config.icon }),
    selected: false,
  },
  {
    uuid: 2003,
    label: '专业律师',
    renderIcon: () => h(LawyerIcon, { ...config.icon }),
    selected: true,
  },
  {
    uuid: 2004,
    label: '私人厨房',
    renderIcon: () => h(ChefIcon, { ...config.icon }),
    selected: false,
  },
  {
    uuid: 2005,
    label: '心理咨询',
    renderIcon: () => h(HeartIcon, { ...config.icon }),
    selected: false,
  },
])

function onAiButtonClick(uuid) {
  buttons.value.forEach((btn) => {
    if (btn.uuid === uuid)
      btn.selected = true

    else
      btn.selected = false
  })
}
</script>

<template>
  <div class="ai-button-group">
    <NSpace>
      <NButton
        v-for="(btn, idx) in buttons"
        :key="idx"
        :render-icon="btn.renderIcon"
        size="large"
        :style="{
          '--n-border': btn.selected ? 'none' : config.border,
          '--n-border-radius': '10px',
          '--n-border-focus': btn.selected ? config.activeBorder : config.border,
          '--n-border-pressed': !btn.selected ? config.border : config.activeBorder,
          '--n-border-hover': !btn.selected ? config.border : config.activeBorder,
          '--n-ripple-color': !btn.selected ? config.border : config.activeBorder,
          '--n-text-color-hover': config.color,
          '--n-text-color-pressed': config.color,
          '--n-text-color-focus': config.color,
          'background': btn.selected ? 'transparent' : '#dde2fd',
        }"
        :class="{
          'ai-button__selected': btn.selected,
        }"
        @click="onAiButtonClick(btn.uuid)"
      >
        {{ btn.label }}
      </NButton>
    </NSpace>
  </div>
</template>

<style lang="scss">

</style>
