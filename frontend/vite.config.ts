import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => (tag.indexOf('swiper-') >= 0) || (tag.indexOf('md-') >= 0)
        }
      }
    })
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL("./src", import.meta.url))
    }
  },
})