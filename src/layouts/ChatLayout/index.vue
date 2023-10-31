<script setup lang="ts">
import { AppNavHeader, AppSiderbar } from '@/layouts/index'
</script>

<template>
  <main class="h-screen w-full overflow-hidden bg-chat-layout">
    <AppNavHeader />
    <div class="chat-main container mx-auto pt-10 pb-10">
      <div class="w-full h-full flex">
        <AppSiderbar class="bg-siderbar h-full" />
        <div class="right-wrapper">
          <div class="chat-toolbar">
            <span>A</span>
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
    </div>
  </main>
</template>

<style scoped lang="scss">
.chat-main {
  height: calc(100vh - 84px );
}
</style>
