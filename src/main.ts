import { createApp } from 'vue'
import './styles/main.scss'
import App from './App.vue'

import { setupI18n } from './plugins'
import { setupStore } from './store'
import { setupRouter } from './router'

async function bootstrap() {
  const app = createApp(App)

  setupI18n(app)
  setupStore(app)

  setupRouter(app)

  app.mount('#app')
}

bootstrap()
