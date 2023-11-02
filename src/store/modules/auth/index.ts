import { defineStore } from 'pinia'
import { getToken, removeToken, setToken } from './helper'
import type { SessionType } from '@/api/interface'
import { store } from '@/store'

export interface AuthState {
  token: string | undefined
  session: SessionType | null

}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    token: getToken(),
    session: null,
  }),
  getters: {
    isChatGPT(state): boolean {
      return state.session?.model === 'gpt' ?? true
    },
  },
  actions: {
    async setSession(session: SessionType) {
      this.session = session
    },
    setToken(token: string) {
      this.token = token
      setToken(token)
    },

    removeToken() {
      this.token = undefined
      removeToken()
    },
    logout() {
      this.session = null
      this.removeToken()
    },
  },
})

export function useAuthStoreWithout() {
  return useAuthStore(store)
}
