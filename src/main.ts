import { createApp } from 'vue'
import './styles/main.scss'
import App from './App.vue'

import { setupNaive, setupScrollbarStyle } from './plugins'
import { setupI18n } from './i18n'
import setupAssets from './plugins/setup-assets'
import { setupStore } from './store'
import { setupRouter } from './router'

setupAssets()
async function bootstrap() {
  const app = createApp(App)

  setupScrollbarStyle()

  setupI18n(app)
  setupStore(app)
  setupNaive(app)

  setupRouter(app)

  app.mount('#app')
}

bootstrap()
