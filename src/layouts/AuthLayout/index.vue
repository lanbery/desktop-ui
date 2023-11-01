<script setup lang="ts">
import LoginHeader from './Header/index.vue'
import LoginFooter from './Footer/index.vue'
</script>

<template>
  <div class="login-layout min-h-screen w-full bg-login bg-cover">
    <LoginHeader />
    <RouterView v-slot="{ Component }">
      <Transition
        name="slide-fade"
        mode="out-in"
      >
        <component
          :is="Component"
          class="login-layout-main container mx-auto"
        />
      </Transition>
    </RouterView>
    <LoginFooter />
  </div>
</template>

<style scoped lang="scss">
.login-layout-main {
  min-height: calc(100vh - 230px);
}
</style>
