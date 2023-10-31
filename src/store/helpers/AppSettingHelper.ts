import { ss } from '@/utils/storage'

export interface AppState {
  id: string
}

export class AppSettingHelper {
  private static LOCAL_STORAGE_NAME = 'appSettings'

  static getDefaultAppState(): AppState {
    const state = ss.get(this.LOCAL_STORAGE_NAME)
    return { id: 'xxxId', ...state }
  }

  static saveAppState(appState: AppState) {
    if (appState)
      ss.set(this.LOCAL_STORAGE_NAME, appState)
  }
}
