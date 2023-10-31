import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

import { enUS, zhCN } from '@/locales'

export type Language = 'zh_CN' | 'en_US'

const i18n = createI18n({
  legacy: false, // 默认是true的
  fallbackLocale: 'zh_CN',
  globalInjection: true,
  allowComposition: true,
  messages: {
    en_US: enUS,
    zh_CN: zhCN,
  },
})

export const t = i18n.global.t

export function setLocale(locale: Language) {
  i18n.global.locale.value = locale
}

export function setupI18n(app: App) {
  app.use(i18n)
}

export default i18n
