<script setup lang="ts">
import type { Component } from 'vue'
import { computed, h, nextTick, ref } from 'vue'
import { NAvatar, NDropdown } from 'naive-ui'
import { useRouter } from 'vue-router'
import GlobalModal from '../GlobalModal/index.vue'
import DropUserHeader from './DropUserHeader.vue'
import { t } from '@/i18n'
import defaultAvatar from '@/assets/avatar_default.png'
import { LogoutIcon, PhoneIcon, SettingIcon } from '@/ui/Icons'
import { useAppModalStore, useAuthStore } from '@/store'

type GlobalModalType = InstanceType<typeof GlobalModal>

const router = useRouter()
const appModalStore = useAppModalStore()
const authStore = useAuthStore()

const globalModalRef = ref<GlobalModalType | null>(null)
const options = [
  {
    key: 'userHeader',
    type: 'render',
    render: renderIcon(DropUserHeader, { size: 64 }),
  },
  {
    key: 'accountSetting',
    label: t('menus.accountSetting'),
    icon: renderIcon(SettingIcon),
    props: {
      onClick: () => {
        // ms.warning('HHHHHH')
        appModalStore.setGlobalModalShow('accountSetting')
      },
    },
  },
  {
    key: 'setPhone',
    label: t('menus.setPhone'),
    icon: renderIcon(PhoneIcon),
    props: {
      onClick: async () => {
        appModalStore.setGlobalModalShow('setPhone')
        await nextTick(() => {
          if (globalModalRef?.value)
            (globalModalRef.value as any)?.setNavKey('setPhone')
        })
      },
    },
  },
  {
    key: 'logout',
    label: t('menus.logout'),
    icon: renderIcon(LogoutIcon),
    props: {
      onClick: async () => {
        await authStore.logout()
        router.push('/login')
      },
    },
  },
]

const items = ref(options)
const show = computed(() => appModalStore.globalModalShow)

const hasLogin = ref<boolean>(true)

function renderIcon(icon: Component, options?: Record<string, any>) {
  return () => {
    return h(icon, { size: 18, color: '#424242', ...options, class: 'me-2 text-muted' })
  }
}

function modalCloseHandle() {
  appModalStore.setGlobalModalHide()
}
</script>

<template>
  <div>
    <div v-if="!hasLogin" class="login-box">
      <span>Login</span>
    </div>
    <div v-else class="user-dropdown">
      <NDropdown
        trigger="hover" :options="items"
        :style="{
          '--n-option-color-hover': '#e7ecfa',
          '--n-color': '#fdfbff',
        }"
      >
        <NAvatar :src="defaultAvatar" :size="48" round />
      </NDropdown>
    </div>

    <GlobalModal
      ref="globalModalRef"
      :show="show"
      @close="modalCloseHandle"
    />
  </div>
</template>

<style  lang="scss">
.n-dropdown-menu.n-popover-shared.__popover-light-1g1nh1v.n-dropdown.__dropdown-light-1g1nh1v-m {
  background: linear-gradient(to bottom, #f5f8ff,#f4fcff) ;
}

.n-dropdown-menu .n-dropdown-option .n-dropdown-option-body {
  padding-left: 12px;
  padding-right: 8px;
}
</style>
@/i18n
