<script setup lang="ts">
import { ref } from 'vue'
import { NModal } from 'naive-ui'
import { CloseRound } from '@vicons/material'
import type { ModalComponentType } from '@/store/modules/modal'
import { AccountSettingComp, MobileUpdateComp } from '@/pages/modals'

interface Props {
  show: boolean
}
interface Emit {
  (ev: 'close'): void
}
withDefaults(defineProps<Props>(), {
  show: false,
})
const emit = defineEmits<Emit>()

const navKey = ref<ModalComponentType>('accountSetting')

const modalContainerStyle = {
  '--n-border-radius': '14px',
  '--n-padding-bottom': '0px',
  '--n-padding-left': '0px',
  '--n-padding-right': '0px',
}

function closeHandle() {
  emit('close')
}

function setNavKey(nav: ModalComponentType) {
  navKey.value = nav
}

function onNavClick(nav: ModalComponentType) {
  navKey.value = nav
}

defineExpose({
  setNavKey,
})
</script>

<template>
  <NModal
    transform-origin="center"
    :mask-closable="false"
    display-directive="show"
    :show="show"
  >
    <div class="loto-global-modal w-full relative">
      <n-card
        :style="{
          ...modalContainerStyle,
        }"
      >
        <div class="loto-global-container w-full flex items-stretch">
          <div class="loto-global-left bg-navbg rounded-s-[14px]">
            <div
              class="loto-global-nav__item rounded-tl-[14px]"
              :class="{
                'bg-white text-main text-lg': navKey === 'accountSetting',
              }"
              @click="onNavClick('accountSetting')"
            >
              <div class="inner-item">
                账号设置
              </div>
            </div>
            <div
              class="loto-global-nav__item"
              :class="{
                'bg-white text-main text-lg': navKey === 'setPhone',
              }"
              @click="onNavClick('setPhone')"
            >
              <div class="inner-item">
                更换手机号
              </div>
            </div>
            <div
              class="loto-global-nav__item"
              :class="{
                'bg-white text-main text-lg': navKey === 'aboutApp',
              }"
              @click="onNavClick('aboutApp')"
            >
              <div class="inner-item">
                文广天书
              </div>
            </div>
          </div>
          <!-- right -->
          <div class="loto-global-right py-10 pe-20 ps-12 flex-grow">
            <MobileUpdateComp v-if="navKey === 'setPhone'" />
            <AccountSettingComp v-if="navKey === 'accountSetting'" />
          </div>
        </div>
      </n-card>
      <div class="close-wrapper absolute top-0 right-0 translate-x-12">
        <n-icon
          class="cursor-pointer"
          :size="48" color="#fff"
          @click="closeHandle"
        >
          <CloseRound />
        </n-icon>
      </div>
    </div>
  </NModal>
</template>

<style scoped lang="scss">
.loto-global-modal {
  width: calc(100vw - 80px);
  max-width:800px;
}
@media (min-width: 768px) {
  .loto-global-modal {
    width:85vw;
  }
}
@media (min-width: 1024px) {
  .loto-global-modal {
    width:60vw;
  }
}
@media (min-width: 1536px) {
  .loto-global-modal {
    width:45vw;
  }
}

.loto-global {
  &-left {
    width: 220px;
    min-height: 486px;
    padding: 0;
  }

  &-nav__item {
    text-align: center;
    cursor: pointer;

    &>div.inner-item {
      height: 68px;
      display:flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
