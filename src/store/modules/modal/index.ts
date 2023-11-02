import { defineStore } from 'pinia'
import { store } from '@/store'

export type ModalComponentType = 'accountSetting' | 'setPhone' | 'aboutApp'

export interface AppModalState {
  globalShow: boolean
  navKey: ModalComponentType
}

export const useAppModalStore = defineStore('loto-modal-store', {
  state: (): AppModalState => ({
    globalShow: false,
    navKey: 'accountSetting',
  }),
  getters: {
    globalModalShow(state): boolean {
      return state.globalShow
    },
    nav(state): ModalComponentType {
      return state.navKey
    },
  },
  actions: {
    setGlobalModalHide() {
      this.globalShow = false
    },
    setGlobalModalShow(nav: ModalComponentType) {
      this.globalShow = true
      this.navKey = nav
    },
    setNavKey(nav: ModalComponentType) {
      this.navKey = nav
    },
  },
})

export function useAppModalStoreWithOut() {
  return useAppModalStore(store)
}
