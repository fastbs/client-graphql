import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//import nodeExternals from 'esbuild-node-externals';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9000
    },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
//  build: {
//    rollupOptions: {
//      external: nodeExternals(),
//    },
//  },
})
