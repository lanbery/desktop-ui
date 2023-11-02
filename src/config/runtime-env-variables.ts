const isDevMode = import.meta.env.DEV
export const avatarCDNBase = import.meta.env.VITE_AVATAR_BASE_CND ?? ''

export default {
  isDevMode,
  avatarCDNBase,
}
