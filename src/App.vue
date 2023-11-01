<script setup lang="ts">
import { NConfigProvider, NLoadingBarProvider, NMessageProvider, NNotificationProvider } from 'naive-ui'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useThemeStore } from './store'
import { AppNavHeader } from '@/layouts'

const route = useRoute()

const themeStore = useThemeStore()
const isLogin = computed(() => ['/login'].includes(route.fullPath))
</script>

<template>
  <div class="display-content bg-layout-light dark:bg-layout-dark">
    <NConfigProvider
      :locale="themeStore.locale"
      :date-locale="themeStore.dateLocale"
      :theme="themeStore.theme"
      :theme-overrides="themeStore.themeOverrides"
      abstract
      inline-theme-disabled
    >
      <NLoadingBarProvider>
        <NNotificationProvider>
          <NMessageProvider>
            <RouterView v-if="isLogin" v-slot="{ Component }">
              <template v-if="Component">
                <Transition
                  name="router"
                  mode="out-in"
                >
                  <component
                    :is="Component"
                    class="text-base"
                  />
                </Transition>
              </template>
            </RouterView>

            <main v-else class="h-screen w-full overflow-hidden bg-chat-layout">
              <AppNavHeader />
              <div class="chat-main container mx-auto pt-10 pb-10">
                <RouterView v-slot="{ Component }">
                  <template v-if="Component">
                    <Transition
                      name="router"
                      mode="out-in"
                    >
                      <component
                        :is="Component"
                        class="text-base"
                      />
                    </Transition>
                  </template>
                </RouterView>
              </div>
            </main>
          </NMessageProvider>
        </NNotificationProvider>
      </NLoadingBarProvider>
    </NConfigProvider>
  </div>
</template>

<style scoped lang="scss">
.router-enter-active,
.router-leave-active {
  transition: opacity 0.2s ease;
}
.router-enter-from,
.router-leave-to {
  opacity: 0;
}

@media print {
  .display-content {
    display: none;
  }
}
.chat-main {
  height: calc(100vh - 84px );
}
</style>
