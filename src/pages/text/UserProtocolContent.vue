<script setup lang="ts">
import { computed } from 'vue'
import { userProtocol, userSections } from './user-protocol'

const items = computed(() => userSections || [])
</script>

<template>
  <div class="h-full w-full pt-2 flex flex-col justify-between">
    <div class="space-y-4">
      <div v-for="item in items" :key="item.id" class="protocol-section-item">
        <div v-if="item.section?.length" class="protocol-section-title py-3 ">
          <h3 class="leading-6">
            {{ item.section }}
          </h3>
        </div>
        <p class="protocol-section-content">
          {{ item.content }}
        </p>

        <div v-if="item?.list?.length" class="block">
          <p v-for="(p, idx) in item.list" :key="idx">
            {{ p }}
          </p>
        </div>
      </div>
      <div class="w-full text-right leading-8 text-base pr-2">
        <p>{{ userProtocol.tailName }}</p>
        <p>{{ userProtocol.tailDate }}</p>
      </div>
    </div>

    <div class="pt-2 pb-4 w-full">
      <slot name="default" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.protocol {
  &-section {
    &-item {
      padding: 0 12px;
      line-height: 1.5rem;
    }

    &-title {
      font-size: 1rem;
      line-height: 1.25rem;
    }
  }
}
</style>
