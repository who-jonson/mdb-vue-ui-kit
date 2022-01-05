import { resolve } from 'path'
import { existsSync, lstatSync, readdirSync, rmdirSync, unlinkSync } from 'fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dtsPlugin from 'vite-plugin-dts'

emptyDir(resolve(__dirname, 'dist'))

export const ssrTransformCustomDir = () => {
  return {
    props: [],
    needRuntime: true
  }
}

export default defineConfig({
  plugins: [
    dtsPlugin({
      outputDir: 'dist/types',
      exclude: ['playgrounds'],
      staticImport: true,
      insertTypesEntry: true
    }),
    vue({
      template: {
        compilerOptions: {
          directiveTransforms: {
            'mdb-click-outside': ssrTransformCustomDir
          }
        }
      }
    })
  ],
  resolve: {
    alias: {
      // @ts-ignore
      '@/': new URL('./src/', import.meta.url).pathname
    }
  },
  build: {
    target: 'esnext',
    ssrManifest: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MDBVueUiKit',
      formats: ['es', 'umd'],
      fileName: 'mdb-vue-ui-kit'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into library
      external: [
        '@popperjs/core',
        'vue',
        'vue/server-renderer'
      ],
      output: {
        globals: {
          '@popperjs/core': 'Popper',
          'vue': 'Vue',
          'vue/server-renderer': 'VueServerRenderer'
        }
      }
    },
    sourcemap: true
  }
})

function emptyDir(dir: string): void {
  if (!existsSync(dir))
    return

  for (const file of readdirSync(dir)) {
    const abs = resolve(dir, file)

    if (lstatSync(abs).isDirectory()) {
      emptyDir(abs)
      rmdirSync(abs)
    }
    else {
      unlinkSync(abs)
    }
  }
}
