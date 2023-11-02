import { defineStore } from 'pinia'
import type { UserInfo, UserState } from '@/store/helpers/UserStorageHelper'
import { getLocalState } from '@/store/helpers/UserStorageHelper'

export const useUserStore = defineStore('user-store', {
  state: () => getLocalState(),
  getters: {
    getUserInfo: (state: UserState) => state.userInfo,
    getUserAvatar: (state: UserState) => {
      return state.userInfo?.avatar
    },
  },
  actions: {
    updateUserInfo(userInfo: Partial<UserInfo>) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
  },
})
