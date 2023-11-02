<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  LockOutlined,
  PhoneAndroidRound, SupervisedUserCircleSharp,
  VerifiedUserOutlined, VisibilityOffOutlined,
  VisibilityOutlined,
} from '@vicons/material'
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import { NInput, useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { checkPassRule, isPhoneNumber } from '@/validators'
import type { IRegisteredUser, Response } from '@/api'
import { registeredAccount, sendCodeForRegistered, userLogin } from '@/api'
import { OkCode } from '@/api/constants'
import { t } from '@/i18n'

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
  username: string
  mobile: string
  password: string
  repeat: string
  code: string
}

const router = useRouter()
const ms = useMessage()

const ctrlState = ref({
  loading: false,
})

const loading = computed(() => ctrlState.value.loading)

const model = ref<ModelType>({
  username: '',
  mobile: '',
  password: '',
  repeat: '',
  code: '',
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
      validator(_rule: FormItemRule, value: string) {
        if (!value)
          return new Error('请输入密码')

        else if (!checkPassRule(value))
          return new Error('密码最少大于4个字符')

        return true
      },
      message: '请输入密码',
      trigger: ['input', 'blur'],
    },
  ],
  repeat: [
    {
      required: true,
      validator: validatePasswordSame,
      message: '两次密码不一致',
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

function validatePasswordSame(_rule: FormItemRule, value: string) {
  return value === model.value.password
}

async function validParams(): Promise<IRegisteredUser | undefined> {
  const invalid = await formRef.value?.validate()
  if (invalid)
    return
  const { username, password, mobile, code } = model.value

  return { username, password, mobile, code, name: username }
}

async function sendVerifyCodeHandle() {
  try {
    const phone = model.value.mobile?.trim()
    if (!phone || !isPhoneNumber(phone))
      throw new Error('手机号码不正确')

    const { code, result } = await sendCodeForRegistered<Response<boolean>>(phone)
    if (code === OkCode && result)
      ms.success('发送成功')

    else
      ms.warning('发送失败请重试')
  }
  catch (e: any) {
    let msg = e?.message
    if (e.code)
      msg = t(`error.${e.code}`, { account: model.value.mobile })

    ms.warning(msg || '发送失败')
  }
}

async function onRegisteredHandle() {
  const params = await validParams()
  if (!params)
    return false
  try {
    ctrlState.value.loading = true
    const { code, message, result } = await registeredAccount<Response<CommonUser>>(params)
    if (code === OkCode && result) {
      await userLogin({ account: params.mobile, password: params.password })
      router.replace({ name: 'Root' })
    }
    else { throw new Error(message) }
  }
  catch (e: any) {
    let msg = e?.message
    if (e.code && !msg)
      msg = t(`error.${e.code}`, { account: model.value.mobile })

    ms.warning(msg || '注册失败')
  }
  finally {
    ctrlState.value.loading = false
  }
}

onMounted(() => {
  Object.assign(model.value, { mobile: '17736576046', username: 'test' })
})
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
            :loading="loading"
            :disabled="verifyBtnDisabled"
            :style="{
              '--n-color': '#432fff',
              '--n-height': '48px',
              '--n-font-size': '16px',
              'background-color': 'transparent',
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
          :loading="loading"
          :style="{
            '--n-height': '48px',
            '--n-padding': '0 36px',
            'background': '#432fff',
            '--n-border-radius': '10px',
            '--n-font-size': '18px',
          }"
          @click="onRegisteredHandle"
        >
          注册
        </NButton>
      </div>
    </n-form>
  </div>
</template>

<style scoped lang="scss"></style>
