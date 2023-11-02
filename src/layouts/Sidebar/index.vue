<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AppLogo, NavRectItem } from '../../ui'
import aiDrawBg from '@/assets/images/ai_draw_bg.png'
import aimlTitle from '@/assets/images/aiml_title.png'
import chatImg from '@/assets/icon/nav_ai_chat.png'
import titleGen from '@/assets/icon/nav_aigc_title.png'
import textZip from '@/assets/icon/nav_aigc_zip.png'
import textGen from '@/assets/icon/nav_aigc_gen.png'

const route = useRoute()
const router = useRouter()
const iconSize = 42

interface NavItem {
  id: number
  name: string
  size: number
  path?: string
  actived: boolean
  icon?: string
}

const items: NavItem[] = [
  {
    id: 1,
    name: '小金AI语言助手',
    size: iconSize,
    path: '/chat/2001',
    actived: true,
    icon: chatImg,
  },
  {
    id: 2,
    name: '标题生成',
    size: iconSize,
    path: '/aigc/title_gen',
    actived: false,
    icon: titleGen,
  },
  {
    id: 3,
    name: '长文缩编',
    size: iconSize,
    path: '/aigc/text_zip',
    actived: false,
    icon: textZip,
  },
  {
    id: 4,
    name: '一键成文',
    size: iconSize,
    path: '/aigc/generate_content',
    actived: false,
    icon: textGen,
  },
]

const navs = ref<NavItem[]>(items)

function onNavItemClick(item: NavItem) {
  navs.value.forEach((it) => {
    if (it.id === item.id)
      it.actived = true
    else it.actived = false
  })

  const currPath = route.fullPath

  if (currPath !== item.path && item.path)
    router.push(item.path)
}
</script>

<template>
  <div class="loto-app-siderbar h-full w-[320px] flex flex-col">
    <AppLogo :size="100" name="文广天书" class="pt-10 pb-4" />
    <div class="item-wrapper flex-grow">
      <NavRectItem
        v-for="item in navs"
        :key="item.id"
        :size="item.size"
        :title="item.name"
        :actived="item.actived"
        :icon="item.icon"
        @click="onNavItemClick(item)"
      />
    </div>
    <div class="ai-card w-full p-3 h-[120px] relative">
      <div class="bg-ai-draw absolute top-0">
        <img :src="aiDrawBg">
      </div>
      <div class="absolute top-0 w-[2/3] left-[130px] h-full flex flex-col items-start justify-center space-y-3">
        <img :src="aimlTitle">
        <span class="text-silver">体验一键妙笔生画</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
