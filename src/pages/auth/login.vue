<script setup lang="ts">
import { NButton, NIcon, NImage } from 'naive-ui'
import SignContainer from './SignForm/index.vue'
import loginLogo from '@/assets/sign/login_logo.png'
import loginTitle from '@/assets/sign/login_title.png'
import SvgIcon from '@/ui/Icons/SvgIcon.vue'
</script>

<template>
  <div class="w-full flex">
    <div class="login-left flex flex-col justify-start items-start space-y-8 ps-28">
      <div class="h-36" />
      <div class="logo-wrapper w-full space-x-5">
        <NIcon :size="100">
          <img :src="loginLogo">
        </NIcon>
        <NImage :src="loginTitle" preview-disabled :height="100" />
      </div>
      <div class="login-desc">
        <p class="text-lg text-black">
          基于Chat模型开发，支持多轮对话，具备内容创作、信息归纳总结等能力
        </p>
      </div>
      <div class="login-button">
        <NButton
          class="login-tip-btn" type="info" color="#432fff"
          icon-placement="right"
          :style="{
            '--n-height': '64px',
            '--n-padding': '0 36px',
            'background': '#432fff',
            '--n-icon-size': '36px',
            '--n-border-radius': '12px',
          }"
        >
          <template #icon>
            <SvgIcon icon="ph:caret-right-bold" />
          </template>
          <span class="text-white text-4xl">登录立即体验</span>
        </NButton>
      </div>
    </div>
    <div class="flex-grow" />
    <div class="login-right flex-1 flex items-center pb-8">
      <SignContainer />
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-layout-main {
    .login {
      &-left {
        flex: 2
      }

      &-right {
        min-width: 400px;
      }
    }

    button.login-tip-btn {
      background-color: "#432fff";
    }
}
</style>
