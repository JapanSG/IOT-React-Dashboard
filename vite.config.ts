import { resolve } from 'node:path'
import viteFastify from '@fastify/vite/plugin'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const rootPath = resolve(import.meta.dirname, 'src/client')

export default defineConfig({
  root: rootPath,
  plugins: [viteFastify({spa: true}), viteReact({ jsxRuntime: 'classic' })],
  build: {
    outDir: resolve(import.meta.dirname, 'dist')
  }
})