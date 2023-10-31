<script setup lang="ts">
import { ref } from 'vue'
import { AppLogo, NavRectItem } from '../../ui'

const iconSize = 36

interface NavItem {
  id: number
  name: string
  size: number
  path?: string
  actived: boolean
}

const items: NavItem[] = [
  {
    id: 1,
    name: '小金AI语言助手',
    size: iconSize,
    path: '/aaa',
    actived: true,
  },
  {
    id: 2,
    name: '标题生成',
    size: iconSize,
    path: '/aaa',
    actived: false,
  },
  {
    id: 3,
    name: '长文缩编',
    size: iconSize,
    path: '/aaa',
    actived: false,
  },
  {
    id: 4,
    name: '一键成文',
    size: iconSize,
    path: '/aaa',
    actived: false,
  },
]

const navs = ref<NavItem[]>(items)

function onNavItemClick(item: NavItem) {
  navs.value.forEach((it) => {
    if (it.id === item.id)
      it.actived = true
    else it.actived = false
  })
}
</script>

<template>
  <div class="loto-app-siderbar h-full w-[320px] relative">
    <AppLogo :size="100" name="文广天书" class="pt-10 pb-4" />
    <div class="item-wrapper">
      <NavRectItem
        v-for="item in navs"
        :key="item.id"
        :size="item.size"
        :title="item.name"
        :actived="item.actived"
        @click="onNavItemClick(item)"
      />
    </div>
    <div class="ai-card bottom-0 w-full absolute bottom-0">
      <div class="h-16 ps-6">
        AI 马良
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
