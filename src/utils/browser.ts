export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
export function isWeChatBrowser(): boolean {
  return /MicroMessenger/i.test(navigator.userAgent)
}
export function isIOSDevice(): boolean {
  const userAgent = window.navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(userAgent)
}

export function isDesktop(): boolean {
  return !isMobileDevice() && !isWeChatBrowser() && !isIOSDevice()
}
