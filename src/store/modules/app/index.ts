import { defineStore } from 'pinia'

import { store } from '@/store'
import type { AppState } from '@/store/helpers/AppSettingHelper'
import { AppSettingHelper } from '@/store/helpers/AppSettingHelper'

export const useAppStore = defineStore('app-store', {
  state: (): AppState => AppSettingHelper.getDefaultAppState(),

  actions: {
    recordState() {
      AppSettingHelper.saveAppState(this.$state)
    },
  },
},
)

export function useAppStoreWithOut() {
  return useAppStore(store)
}
