import { isDesktop, isIOSDevice, isMobileDevice, isWeChatBrowser } from '@/utils/browser'
import { AppRuntimeEnv } from '@/config'

export function useEnv() {
  const baseCDN = AppRuntimeEnv.avatarCDNBase

  function prebuildPath(pathname?: string) {
    if (!pathname)
      return
    if (!baseCDN)
      return pathname

    if (/^(http|https):\/\/([\w.]+\/?)\S*/.test(pathname))
      return pathname

    return `${baseCDN}/${pathname}`
  }
  const env = {
    isWx: isWeChatBrowser(),
    isMobile: isMobileDevice(),
    isIOS: isIOSDevice(),
    isPC: isDesktop(),
    convertAvatar: prebuildPath,
  }

  return { ...env, isIOSDevice, isWeChatBrowser }
}
