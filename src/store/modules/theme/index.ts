import { darkTheme, dateEnUS, dateZhCN, enUS, lightTheme, zhCN } from 'naive-ui'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { darkThemeOverrides, ligthThemeOverrides } from '@/constants'
import type { Language } from '@/i18n'
import { LanguageHelper } from '@/store/helpers/LanguageHelper'
import type { Theme } from '@/store/helpers/ThemeHelper'
import { ThemeLocaleHelper } from '@/store/helpers/ThemeHelper'

/**
 *
 */
export const useThemeStore = defineStore('app-theme', () => {
  const themeMode = ref<Theme>(ThemeLocaleHelper.getDefaultThemeMode())
  const locale = ref(LanguageHelper.getDefaultLocale())
  const dateLocale = ref(LanguageHelper.getDefaultDateLocale())

  const theme = computed(() => themeMode.value === 'light' ? lightTheme : darkTheme)
  const themeOverrides = computed(() => themeMode.value === 'light' ? ligthThemeOverrides : darkThemeOverrides)

  const changeThemeMode = (selectedTheme: Theme) => {
    themeMode.value = selectedTheme
    if (selectedTheme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
      ThemeLocaleHelper.setTheme('dark')
    }
    else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
      ThemeLocaleHelper.setTheme('light')
    }
  }

  const changeLocale = (selectedLocale: Language) => {
    switch (selectedLocale) {
      case 'zh_CN':
        locale.value = zhCN
        dateLocale.value = dateZhCN
        break
      case 'en_US':
        locale.value = enUS
        dateLocale.value = dateEnUS
        break
      default:
        break
    }
  }

  //
  changeThemeMode(ThemeLocaleHelper.getDefaultThemeMode())

  return {
    changeLocale,
    changeThemeMode,
    dateLocale,
    locale,
    theme,
    themeMode,
    themeOverrides,
  }
})
