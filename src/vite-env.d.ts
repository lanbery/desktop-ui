/// <reference types="vite/client" />
declare type Recordable<T = any> = Record<string, T>

interface ImportMetaEnv {
  VITE_PORT: string
  VITE_APP_NAME: string
  VITE_GLOB_APP_PWA?: boolean
  VITE_GLOB_APP_INFO?: Record<string, any>
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
