import { get, post } from '../http'
import type { ILoginUser } from '../interface'
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
