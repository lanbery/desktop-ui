import { OkCode } from '../constants'
import { get } from '../http'
import type { ILoginUser } from '../interface'
import { CommRestPaths } from './rest-paths'
import { login } from './sign-api'
import type { UserInfo } from '@/store/helpers'
import { useAuthStoreWithout, useUserStoreWithOut } from '@/store'

export async function userLogin(user: ILoginUser) {
  const authStore = useAuthStoreWithout()
  const userStore = useUserStoreWithOut()
  const token = await login(user)
  if (!token)
    throw new Error('登录失败')

  await authStore.setToken(token as string)

  const { code, message, result } = await getUserInfo<CommResponse<UserInfo>>()
  if (code === OkCode && result)
    await userStore.updateUserInfo(result as Partial<UserInfo>)
  else
    throw new Error(message || '获取用户信息失败')

  return true
}

export function getUserInfo<T>() {
  return get<T>({
    url: CommRestPaths.userInfo,
  })
}

export async function userLogout() {
  const authStore = useAuthStoreWithout()
  const userStore = useUserStoreWithOut()
  await authStore.logout()
  await userStore.logout()
}
