import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
// 1. 引入 Quasar 的外掛
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // 2. 幫 vue 加上 template 參數，讓 Quasar 能正確處理資源路徑
    vue({
      template: { transformAssetUrls }
    }),
    vueJsx(),
    vueDevTools(),
    // 3. 把 quasar 外掛加進來
    quasar({
      // sassVariables: 'src/quasar-variables.sass'
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})