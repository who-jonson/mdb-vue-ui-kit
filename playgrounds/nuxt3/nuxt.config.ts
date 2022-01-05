import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtConfig } from 'nuxt3'

// @ts-ignore
const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  alias: {
    'mdb-vue-ui-kit': resolve(__dirname, '../../dist/mdb-vue-ui-kit.es.js')
  },

  vite: {
    build: {
      ssr: true
    },
    logLevel: 'info'
  },

  vue: {
    compilerOptions: {
      isCustomElement: tag => ['mdb', 'MDB'].includes(tag)
    }
  }
})
