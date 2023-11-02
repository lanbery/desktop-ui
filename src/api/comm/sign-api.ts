import { get, post } from '../http'
import type { ILoginUser, IRegisteredUser } from '../interface'
import { CommRestPaths } from './rest-paths'

export function login<T>(user: ILoginUser) {
  return post<T>({
    url: CommRestPaths.login,
    data: { ...user },
  })
}

export function fetchSession<T>() {
  return get<T>({
    url: CommRestPaths.fetchSession,
  })
}

export function sendCodeForRegistered<T>(phone: string) {
  return post<T>({
    url: CommRestPaths.sendCode,
    data: { account: phone, type: 'rv' },
  })
}

export function registeredAccount<T>(user: IRegisteredUser) {
  return post<T>({
    url: CommRestPaths.registered,
    data: { ...user },
  })
}
