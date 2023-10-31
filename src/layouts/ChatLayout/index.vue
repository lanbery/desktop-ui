<script setup lang="ts">
import { AppSiderbar } from '@/layouts/index'
import { AiButtonGroup } from '@/ui'
</script>

<template>
  <div class="w-full h-full flex">
    <AppSiderbar class="bg-siderbar h-full" />
    <div class="chat-right-wrapper h-full flex-grow">
      <div class="chat-toolbar">
        <AiButtonGroup />
      </div>
      <RouterView v-slot="{ Component }">
        <Transition
          name="slide-fade"
          mode="out-in"
        >
          <component
            :is="Component"
            class="relative min-h-[calc(100%-144px)] w-full p-2 sm:p-4"
          />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-right-wrapper {
  background-image: linear-gradient(to right, #dde2fd,#edf4ff 45% ,#edf4ff 65%,#f3f4fd);
  padding-left: 40px;
  padding-top: 24px;
  padding-right: 40px;
}
</style>
