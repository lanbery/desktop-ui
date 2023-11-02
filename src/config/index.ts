export { default as AppRuntimeEnv } from './runtime-env-variables'
export function isDevMode() {
  return import.meta.env.DEV
}
