<script setup lang="ts">
import type { Component } from 'vue'
import { h, ref } from 'vue'
import { NAvatar, NDropdown, useMessage } from 'naive-ui'
import DropUserHeader from './DropUserHeader.vue'
import { t } from '@/plugins/i18n'
import defaultAvatar from '@/assets/avatar_default.png'
import { LogoutIcon, PhoneIcon, SettingIcon } from '@/ui/Icons'

const ms = useMessage()
const hasLogin = ref<boolean>(true)

function renderIcon(icon: Component, options?: Record<string, any>) {
  return () => {
    return h(icon, { size: 18, color: '#424242', ...options, class: 'me-2 text-muted' })
  }
}

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
        ms.warning('HHHHHH')
      },
    },
  },
  {
    key: 'setPhone',
    label: t('menus.setPhone'),
    icon: renderIcon(PhoneIcon),
  },
  {
    key: 'logout',
    label: t('menus.logout'),
    icon: renderIcon(LogoutIcon),
  },
]

const items = ref(options)
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
