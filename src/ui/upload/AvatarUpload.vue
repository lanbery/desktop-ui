<script setup lang="ts">
import { computed, onMounted, ref, useSlots, watch } from 'vue'
import { NAvatar, useMessage } from 'naive-ui'
import type { ImageAccept, UploadProps } from './types'
import { MaxUploadSize, defaultAccepts } from './types'
import { useEnv } from '@/hooks'
import defaultAvatar from '@/assets/avatar_default.png'
import { uploadCOSDirect } from '@/api/comm/upload-api.ts'

const props = withDefaults(defineProps<UploadProps>(), {
  accepts: () => defaultAccepts,
  defaultValue: '',
  size: 40,
  maxSize: MaxUploadSize,
  colors: () => (['#fafafa', '#f4f4f5', '#fef9c3']),
})

const emits = defineEmits(['update:modelValue'])
const { convertAvatar } = useEnv()

const hasSlot = useSlots().default

const ms = useMessage()

const fileInputRef = ref<any>(null)

const imageAccepts = computed(() => {
  const { accepts } = props
  return accepts?.length ? (accepts as Array<ImageAccept>).join(',') : (accepts as string)
})

const imgUrl = ref(props.modelValue)

watch(() => props.modelValue, (newValue, _oldValue) => {
  imgUrl.value = newValue
})

function onClickAvatarBox() {
  fileInputRef.value?.click()
}

async function onFileChanged() {
  const file = fileInputRef.value.files[0]
  if (file?.size > props.maxSize) {
    ms.warning('图片超过指定大小')
    return false
  }
  try {
    const fileName = file.name

    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', 'avatar')
    if (props.extra) {
      Object.keys(props.extra).forEach((key: string) => {
        formData.append(key, (props.extra as Record<string, string>)[key])
      })
    }

    // const { code, message, result } = await avatarUploading(formData)
    await uploadCOSDirect(formData, fileName)

    if (file) {
      const winUrl = window.URL || window.webkitURL
      imgUrl.value = winUrl.createObjectURL(file)
    }
    else {
      throw new Error('请选择头像')
    }

    emits('update:modelValue', imgUrl)
  }
  catch (e: any) {
    const msg = e.message || '上传失败'
    window.console.log(e)
    ms.warning(msg)
  }
  finally {
    // TODO
  }
}

onMounted(() => {
  if (props.modelValue)
    imgUrl.value = convertAvatar(props.modelValue)
})
</script>

<template>
  <div class="avatar-upload flex items-center justify-center" @click="onClickAvatarBox">
    <input ref="fileInputRef" type="file" hidden style="display:none" :accept="imageAccepts" @change="onFileChanged">
    <div v-if="hasSlot" class="default-wrap">
      <slot name="default" />
    </div>

    <NAvatar v-else :size="size" :src="imgUrl" :fallback-src="defaultAvatar" round />
  </div>
</template>

<style scoped lang="scss"></style>
