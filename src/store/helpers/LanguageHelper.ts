import { dateEnUS, dateZhCN, enUS, zhCN } from 'naive-ui'
import type { Language } from '@/i18n'
import { ss } from '@/utils/storage'

export class LanguageHelper {
  private static LOCAL_STORAGE_NAME = 'lang'

  static getLang() {
    return ss.get(this.LOCAL_STORAGE_NAME)
  }

  static setLang(lang: Language) {
    ss.set(this.LOCAL_STORAGE_NAME, lang)
  }

  static clearLang() {
    ss.remove(this.LOCAL_STORAGE_NAME)
  }

  static getBrowserLang() {
    const lang = window.navigator.language
    if (lang.includes('zh'))
      return 'zh_CN'
    if (lang.includes('en'))
      return 'en_US'
    return ''
  }

  static getDefaultLang() {
    const lang = this.getLang()
    const bsLang = this.getBrowserLang()

    return lang ?? bsLang ?? 'zh_CN'
  }

  static getDefaultLocale() {
    const lang = this.getDefaultLang()
    switch (lang) {
      case 'zh_CN':
        return zhCN
      case 'en_US':
        return enUS
      default:
        return zhCN
    }
  }

  /**
   * 获取 Naive UI 默认日期语言
   */
  static getDefaultDateLocale() {
    const lang = this.getDefaultLang()
    switch (lang) {
      case 'zh_CN':
        return dateZhCN
      case 'en_US':
        return dateEnUS
      default:
        return dateZhCN
    }
  }
}
