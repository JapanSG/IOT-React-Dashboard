import { resolve } from 'node:path'
import viteFastify from '@fastify/vite/plugin'
import viteReact from '@vitejs/plugin-react'

const rootPath = resolve(import.meta.dirname, 'src/client')

export default {
  root: rootPath,
  plugins: [viteFastify(), viteReact({ jsxRuntime: 'classic' })],
}