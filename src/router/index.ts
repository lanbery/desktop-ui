import type { App } from 'vue'
import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { setupGuard } from './guards'

NProgress.configure({ showSpinner: false })
export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

setupGuard(router)
export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}
