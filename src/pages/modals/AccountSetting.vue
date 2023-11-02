<script setup lang="ts">
import { ref } from 'vue'
import { SupervisedUserCircleSharp } from '@vicons/material'
import { AvatarUploader } from '@/ui'

const inputStyles = {
  '--n-height': '40px',
  '--n-border-radius': '10px',
  '--n-icon-size': '24px',
  '--n-icon-color': '#a1a1aa',
}
const formItemStyle = {
  '--n-label-font-weight': 500,
  '--n-label-height': '40px',
  '--n-blank-height': '40px',
}

interface ModelType {
  newAvatar: string | null
  nickname: string | null
}

const model = ref<ModelType>({
  newAvatar: null,
  nickname: null,
})

function onUploadImage() {

}
</script>

<template>
  <div class="user-profile">
    <n-form>
      <n-form-item
        label-placement="left"
        label="头像:"
        label-width="100"
        :style="{ ...formItemStyle, '--n-blank-height': '100px' }"
      >
        <div class="avatar-box flex-grow space-y-6 flex flex-col justify-center items-center">
          <AvatarUploader
            :size="120"
          />
          <div class="avatar-btn-wrapper">
            <NButton
              type="primary"
              :style="{
                '--n-height': '36px',
                '--n-padding': '0 32px',
                'background': '#432fff',
                '--n-border-radius': '10px',
                '--n-font-size': '16px',
              }"
              @click="onUploadImage"
            >
              上传
            </NButton>
          </div>
        </div>
      </n-form-item>

      <n-form-item
        label-placement="left"
        label="昵称:"
        label-width="100"
        :style="{ ...formItemStyle }"
      >
        <n-input
          v-model:value="model.nickname" placeholder="昵称"
          :maxlength="64"
          :style="inputStyles"
        >
          <template #prefix>
            <n-icon :depth="3">
              <SupervisedUserCircleSharp />
            </n-icon>
            <n-divider vertical />
          </template>
        </n-input>
      </n-form-item>
    </n-form>
    <div class="submit-row pt-12 pb-4 ps-[100px]">
      <n-form-item
        n-form-item
        label-placement="left"
        label-width="100"
        :style="{ ...formItemStyle }"
      >
        <div class="flex-grow flex justify-center">
          <NButton
            type="primary"
            :style="{
              '--n-height': '48px',
              '--n-padding': '0 48px',
              'background': '#432fff',
              '--n-border-radius': '10px',
              '--n-font-size': '18px',
            }"
            @click="onUploadImage"
          >
            保存
          </NButton>
        </div>
      </n-form-item>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
