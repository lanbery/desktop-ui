import type { Router } from 'vue-router'
import NProgress from 'nprogress'

export function setupGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    if (to.path !== from.path)
      NProgress.start()

    next()
  })

  router.afterEach((_to) => {
    NProgress.done()
  })
}
