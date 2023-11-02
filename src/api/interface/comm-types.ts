export interface Response<T = any> {
  result: T | undefined
  message: string
  code: number
  error?: string | string[] | undefined
}

export interface SessionType {
  auth: boolean
  model: Chat.Provider
  perimissions?: Array<string>
  expiredAt?: number
  user?: SessionUserType
}

export interface ILoginUser {
  account: string | null
  password: string | null
  code?: string
}

export interface IRegisteredUser {
  username: string
  mobile: string
  password: string
  code?: string
  name?: string
}
