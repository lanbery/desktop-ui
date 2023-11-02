<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import { NInput, NModal, useMessage } from 'naive-ui'
import {
  CloseRound,
  LockOutlined,
  SupervisedUserCircleSharp,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@vicons/material'
import { useRouter } from 'vue-router'
import { UserPrivacyContent, UserProtocolContent } from '@/pages/text'
import type { ILoginUser } from '@/api/interface'
import { t } from '@/i18n'
import { userLogin } from '@/api'

const inputStyles = {
  '--n-height': '48px',
  '--n-border-radius': '10px',
  '--n-icon-size': '24px',
  '--n-icon-color': '#a1a1aa',
}

const modalContainerStyle = {
  '--n-border-radius': '14px',
  '--n-padding-left': '12px',
  '--n-padding-right': '4px',
}

interface ModelType {
  account: string | null
  password: string | null
}

// Store
const ms = useMessage()
const router = useRouter()

const ctrlState = ref({
  loading: false,
  modalShow: false,
  modalContentType: 2,
})

const renderProtocolContent = computed(() => ctrlState.value.modalContentType === 1)
const loading = computed(() => ctrlState.value.loading)

const model = ref<ModelType>({
  account: null,
  password: null,
})

const formRef = ref<FormInst | null>(null)
const formRules: FormRules = {
  account: [
    {
      required: true,
      message: '请输入登录账号',
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
}

async function validParams(): Promise<ILoginUser | undefined> {
  const invalid = await formRef.value?.validate()
  if (invalid)
    return
  const { account, password } = model.value

  return { account, password }
}

// function resetForm() {
//   formRef.value?.restoreValidation()
//   Object.assign(model.value, {
//     account: null,
//     password: null,
//   })
// }

async function onLoginHandle() {
  const params = await validParams()
  if (!params)
    return false
  try {
    ctrlState.value.loading = true
    await userLogin(params)

    await router.replace({ name: 'Root' })
  }
  catch (e: any) {
    let msg = e?.message
    if (e.code)
      msg = e?.code ? t(`error.${e.code}`, { account: model.value.account }) : e?.message
    ms.warning(msg || e.message)
  }
  finally {
    ctrlState.value.loading = false
  }
}

function onModalCloseHandle() {
  ctrlState.value.modalShow = false
}

function onShowUserProtocol(type: number) {
  ctrlState.value.modalShow = true
  ctrlState.value.modalContentType = type
}

onMounted(() => {
  Object.assign(model.value, { account: 'test', password: 'user123' })
})
</script>

<template>
  <div class="h-full flex flex-col justify-between">
    <n-form ref="formRef" :model="model" :rules="formRules">
      <n-form-item label-placement="left" path="account">
        <NInput
          v-model:value="model.account"
          :disabled="loading"
          placeholder="登录账号"
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
      <n-form-item label-placement="left" path="password">
        <NInput
          v-model:value="model.password"
          :disabled="loading"
          placeholder="密码"
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
    </n-form>
    <div class="submit-btn pt-10 pb-6">
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
        @click="onLoginHandle"
      >
        登录
      </NButton>
    </div>
    <div class="protocol-container">
      <p class="flex-nowrap text-sm text-center text-gray-500">
        登录代表您已经同意
        <span class=" text-red-500 cursor-pointer" @click="onShowUserProtocol(1)">
          《用户协议》
        </span>
        和
        <span class="text-red-500 cursor-pointer" @click="onShowUserProtocol(2)">
          《隐私政策》
        </span>
      </p>
    </div>
    <NModal
      v-model:show="ctrlState.modalShow"
      transform-origin="center"
      :mask-closable="false"
    >
      <div class="loto-dialog-container w-full relative">
        <n-card
          :style="{
            ...modalContainerStyle,
          }"
          class="loto-dialog-content"
        >
          <UserProtocolContent v-if="renderProtocolContent">
            <div class="btn-row w-[196px] mx-auto">
              <NButton
                block type="primary"
                :style="{
                  '--n-height': '48px',
                  '--n-padding': '0 36px',
                  'background': '#432fff',
                  '--n-border-radius': '10px',
                  '--n-font-size': '18px',
                }"
                @click="onModalCloseHandle"
              >
                关闭
              </NButton>
            </div>
          </UserProtocolContent>
          <UserPrivacyContent v-else>
            <div class="btn-row w-[196px] mx-auto">
              <NButton
                block type="primary"
                :style="{
                  '--n-height': '48px',
                  '--n-padding': '0 36px',
                  'background': '#432fff',
                  '--n-border-radius': '10px',
                  '--n-font-size': '18px',
                }"
                @click="onModalCloseHandle"
              >
                关闭
              </NButton>
            </div>
          </UserPrivacyContent>
        </n-card>
        <div class="close-wrapper absolute top-0 right-0 translate-x-12">
          <n-icon
            class="cursor-pointer"
            :size="48" color="#fff"
            @click="onModalCloseHandle"
          >
            <CloseRound />
          </n-icon>
        </div>
      </div>
    </NModal>
  </div>
</template>

<style scoped lang="scss">
.loto-dialog-container {
  width: calc(100vw - 80px);
}
@media (min-width: 768px) {
  .loto-dialog-container {
    width:85vw;
  }
}
@media (min-width: 1024px) {
  .loto-dialog-container {
    width:60vw;
  }
}
@media (min-width: 1536px) {
  .loto-dialog-container {
    width:45vw;
  }
}
.loto-dialog-content {
  min-height: 480px;
}
</style>
