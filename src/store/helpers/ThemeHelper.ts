import { ss } from '@/utils/storage'

export type Theme = 'light' | 'dark'

export class ThemeLocaleHelper {
  private static LOCAL_STORAGE_NAME = 'appTheme'
  static getTheme() {
    return ss.get(this.LOCAL_STORAGE_NAME)
  }

  static setTheme(theme: Theme) {
    ss.set(this.LOCAL_STORAGE_NAME, theme)
  }

  static clearTheme() {
    ss.remove(this.LOCAL_STORAGE_NAME)
  }

  static getDefaultThemeMode(): Theme {
    if (this.getTheme() === 'dark' || (!this.getTheme() && window.matchMedia('(prefers-color-scheme:dark)').matches))
      return 'dark'

    return 'light'
  }
}
