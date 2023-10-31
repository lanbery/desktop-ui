// Read more: https://github.com/vuejs/core/pull/3399
export {}

declare module 'vue' {
  export interface GlobalComponents {
    NConfigProvider: typeof import('naive-ui')['NConfigProvider']
    NNotificationProvider: typeof import('naive-ui')['NNotificationProvider']
    NMessageProvider: typeof import('naive-ui')['NMessageProvider']
    NLoadingBarProvider: typeof import('naive-ui')['NLoadingBarProvider']
  }
}
