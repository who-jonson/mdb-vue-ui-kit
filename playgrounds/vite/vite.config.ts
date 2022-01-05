import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    Vue()
  ],
  resolve: {
    alias: {
      'mdb-vue-ui-kit': resolve(__dirname, '../../dist/mdb-vue-ui-kit.es.js')
    }
  }
})
