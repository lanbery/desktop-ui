import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface UserInfo {
  id: number
  name: string
  mobile: string
  avatar?: string
  description?: string
  username: string
  orgName?: string
}

export const noneUserInfo: UserInfo = {
  id: 0,
  username: '',
  name: '',
  mobile: '',
  avatar: '',
  description: '',
  orgName: '',
}

export interface UserState {
  userInfo: UserInfo
}

export function defaultUserSetting(): UserState {
  return {
    userInfo: noneUserInfo,
  }
}

export function getLocalState(): UserState {
  const localUserState: UserState | undefined = ss.get(LOCAL_NAME)

  return { ...defaultUserSetting(), ...localUserState }
}

export function setLocalUserState(userState: UserState): void {
  ss.set(LOCAL_NAME, userState)
}
