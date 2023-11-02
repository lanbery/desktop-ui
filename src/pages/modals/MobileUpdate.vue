<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  PhoneAndroidRound, VerifiedUserOutlined,
} from '@vicons/material'

import type { FormInst, FormRules } from 'naive-ui'
import { isPhoneNumber } from '@/validators'

const formItemStyle = {
  '--n-label-font-weight': 500,
  '--n-label-height': '40px',
  '--n-blank-height': '40px',
}
const inputStyles = {
  '--n-height': '40px',
  '--n-border-radius': '10px',
  '--n-icon-size': '24px',
  '--n-icon-color': '#a1a1aa',
  'background-color': '#e7ecfa',
  '--n-border-focus': '1px solid rgb(224, 224, 230)',
  '--n-border-hover': '1px solid #e7ecfa',
}

interface ModelType {
  mobile: string | null
  code: string | null
}
const formRef = ref<FormInst | null>(null)
const model = ref<ModelType>({
  mobile: null,
  code: null,
})

const verifyBtnDisabled = computed(() => !isPhoneNumber(model.value.mobile))
const formRules: FormRules = {
  mobile: [
    {
      required: true,
      message: '请输入手机号',
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

function sendVerifyCodeHandle() {}
</script>

<template>
  <div>
    <n-form ref="formRef" :model="model" :rules="formRules">
      <n-form-item
        label-width="100"
        label-placement="left" label="新手机号码"
        path="mobile"
        :style="{
          ...formItemStyle,
        }"
      >
        <n-input
          v-model:value="model.mobile"
          placeholder="请输入手机号码"
          :maxlength="11"
          :style="inputStyles"
        >
          <template #prefix>
            <n-icon :depth="3">
              <PhoneAndroidRound />
            </n-icon>
            <n-divider
              vertical
              :style="{
                '--n-color': 'rgb(224, 224, 230)',
                'margin': '0 4px',
              }"
            />
          </template>
        </n-input>
      </n-form-item>

      <div class="w-full flex justify-start items-stretch">
        <n-form-item
          label-width="100"
          label-placement="left" label="验证码"
          path="code"
          :style="{ ...formItemStyle }"
        >
          <NInput
            v-model:value="model.code"
            type="text"
            placeholder="验证码"
            :style="inputStyles"
          >
            <template #prefix>
              <n-icon :depth="3">
                <VerifiedUserOutlined />
              </n-icon>
              <n-divider
                vertical
                :style="{
                  '--n-color': 'rgb(224, 224, 230)',
                  'margin': '0 4px',
                }"
              />
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

      <div class="submit-btn w-full flex justify-center items-center pt-10">
        <NButton
          type="primary"
          :style="{
            '--n-height': '40px',
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
