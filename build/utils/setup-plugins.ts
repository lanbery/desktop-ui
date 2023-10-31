import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export function setupPlugins(env: ImportMetaEnv): PluginOption[] {
  const appName = env.VITE_APP_NAME ?? '元疆灵境'

  return [
    vue(),
    env.VITE_GLOB_APP_PWA && VitePWA({
      injectRegister: 'auto',
      manifest: {
        name: appName,
        short_name: appName,
        icons: [
          { src: 'logo_192.png', sizes: '192x192', type: 'image/png' },
          { src: 'logo_512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ]
}
