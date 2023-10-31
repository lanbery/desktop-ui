import path from 'node:path'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'

import { buildRuntimeAppInfo, setupPlugins } from './build/utils'

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const viteEnv = loadEnv(env.mode, process.cwd()) as unknown as ImportMetaEnv
  const runtimeEnv = buildRuntimeAppInfo(viteEnv)
  const serverPort = Number.parseInt(viteEnv.VITE_PORT, 10) || 38966

  return {
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
      },
    },
    plugins: setupPlugins(runtimeEnv),
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "src/styles/variables.scss";',
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: serverPort,
      open: false,
      proxy: {
        '/api': {
          target: viteEnv.VITE_APP_API_BASE_URL,
          changeOrigin: true, // 允许跨域
          rewrite: path => path.replace('/api/', '/v1/'),
        },
      },
    },
    build: {
      reportCompressedSize: false,
      sourcemap: false,
      commonjsOptions: {
        ignoreTryCatch: false,
      },
    },
  }
})
