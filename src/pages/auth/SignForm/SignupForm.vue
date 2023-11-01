<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  LockOutlined,
  PhoneAndroidRound, SupervisedUserCircleSharp,
  VerifiedUserOutlined, VisibilityOffOutlined,
  VisibilityOutlined,
} from '@vicons/material'
import type { FormInst, FormRules } from 'naive-ui'
import { NInput } from 'naive-ui'
import { isPhoneNumber } from '@/validators'

const inputStyles = {
  '--n-height': '48px',
  '--n-border-radius': '10px',
  '--n-icon-size': '24px',
  '--n-icon-color': '#a1a1aa',
}

const formItemStyle = {
  '--n-feedback-font-size': '12px',
}

interface ModelType {
  username: string | null
  mobile: string | null
  password: string | null
  repeat: string | null
  code: string | null
}

const model = ref<ModelType>({
  username: null,
  mobile: null,
  password: null,
  repeat: null,
  code: null,
})

const formRef = ref<FormInst | null>(null)

const formRules: FormRules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: ['input', 'blur'],
    },
  ],
  mobile: [
    {
      required: true,
      message: '请输入手机号',
      trigger: ['input', 'blur'],
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: ['input', 'blur'],
    },
  ],
  repeat: [
    {
      required: true,
      message: '请输入确认密码',
      trigger: ['input', 'blur'],
    },
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: ['input', 'blur'],
    },
  ],
}

const verifyBtnDisabled = computed(() => !isPhoneNumber(model.value.mobile))

function sendVerifyCodeHandle() {}
</script>

<template>
  <div>
    <n-form ref="formRef" :model="model" :rules="formRules">
      <n-form-item
        label-placement="left" path="username"
        :style="{ ...formItemStyle }"
      >
        <NInput
          v-model:value="model.username" placeholder="用户名"
          :maxlength="64"
          :style="inputStyles"
        >
          <template #prefix>
            <n-icon :depth="3">
              <SupervisedUserCircleSharp />
            </n-icon>
            <n-divider vertical />
          </template>
        </NInput>
      </n-form-item>
      <n-form-item label-placement="left" path="mobile" :style="{ ...formItemStyle }">
        <NInput
          v-model:value="model.mobile" placeholder="手机号"
          :maxlength="11"
          :style="inputStyles"
        >
          <template #prefix>
            <n-icon :depth="3">
              <PhoneAndroidRound />
            </n-icon>
            <n-divider vertical />
          </template>
        </NInput>
      </n-form-item>
      <n-form-item label-placement="left" path="password" :style="{ ...formItemStyle }">
        <NInput
          v-model:value="model.password" placeholder="密码"
          show-password-on="mousedown"
          type="password"
          :maxlength="20"
          :style="inputStyles"
        >
          <template #prefix>
            <n-icon :depth="3">
              <LockOutlined />
            </n-icon>
            <n-divider vertical />
          </template>
          <template #password-visible-icon>
            <n-icon :size="16" :component="VisibilityOutlined" />
          </template>
          <template #password-invisible-icon>
            <n-icon :size="16" :component="VisibilityOffOutlined" />
          </template>
        </NInput>
      </n-form-item>
      <n-form-item label-placement="left" path="repeat" :style="{ ...formItemStyle }">
        <NInput
          v-model:value="model.repeat" placeholder="确认密码"
          show-password-on="mousedown"
          type="password"
          :maxlength="20"
          :style="inputStyles"
        >
          <template #prefix>
            <n-icon :depth="3">
              <LockOutlined />
            </n-icon>
            <n-divider vertical class="" />
          </template>
          <template #password-visible-icon>
            <n-icon :size="16" :component="VisibilityOutlined" />
          </template>
          <template #password-invisible-icon>
            <n-icon :size="16" :component="VisibilityOffOutlined" />
          </template>
        </NInput>
      </n-form-item>
      <div class="w-full flex justify-start items-stretch">
        <n-form-item label-placement="left" path="code" :style="{ ...formItemStyle }">
          <NInput
            v-model:value="model.code"
            type="text"
            placeholder="请输入验证码"
            :style="inputStyles"
          >
            <template #prefix>
              <n-icon :depth="3">
                <VerifiedUserOutlined />
              </n-icon>
              <n-divider vertical />
            </template>
          </NInput>
        </n-form-item>
        <div class="verify-btn ps-5">
          <NButton
            text
            :disabled="verifyBtnDisabled"
            :style="{
              '--n-color': '#432fff',
              '--n-height': '48px',
              '--n-font-size': '16px',
            }"
            @click="sendVerifyCodeHandle"
          >
            <span>获取验证码</span>
          </NButton>
        </div>
      </div>
      <div class="submit-btn">
        <NButton
          block type="primary"
          :style="{
            '--n-height': '48px',
            '--n-padding': '0 36px',
            'background': '#432fff',
            '--n-border-radius': '10px',
            '--n-font-size': '18px',
          }"
        >
          注册
        </NButton>
      </div>
    </n-form>
  </div>
</template>

<style scoped lang="scss"></style>
