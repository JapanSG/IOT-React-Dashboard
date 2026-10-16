import type {
  FastifyInstance,
  FastifyPluginOptions
} from 'fastify'
import bearer from '@fastify/bearer-auth'

export default async function (fastify : FastifyInstance, opts : FastifyPluginOptions) {
  fastify.get('/', async function (request, reply) {
    return { root: true, token: process.env.AUTH_TOKEN }
  })
}
