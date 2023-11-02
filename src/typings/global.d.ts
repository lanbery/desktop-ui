interface SessionUserType {
  id: number
  username: string
  name?: string
  avatar?: string
}

interface CommonUser {
  id: number
  username: string
  mobile?: string
  nickname?: string
  avatar?: string
}

interface CommResponse<T = any> {
  code?: number
  message?: string
  result: T | undefined
  error?: string | string[] | undefined
}
