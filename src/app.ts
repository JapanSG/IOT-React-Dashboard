import Fastify from 'fastify'
import FastifyVite from '@fastify/vite'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import Device from './simulate/device.js'
import { apiV1 } from './controllers/api.js'

export const fastify = Fastify({ logger: true })

await fastify.register(FastifyVite, {
  root: resolve(import.meta.dirname, '..'),
  dev: process.env.NODE_ENV !== 'production',
  spa: true
})

fastify.get('/', async (request, reply) => {
  return reply.html()
})

fastify.register(apiV1, { prefix: '/api/v1' })
fastify.register(apiV1, { prefix: '/api' })

await fastify.vite.ready()
await fastify.ready()

const invokedFile = process.argv[1]
if (invokedFile && import.meta.url === pathToFileURL(resolve(invokedFile)).href) {
  new Device().run()
  await fastify.listen({
    port: Number(process.env.PORT ?? 3000),
    host: process.env.HOST ?? '0.0.0.0'
  })
}
