import bearer from '@fastify/bearer-auth'
import type { FastifyPluginAsync } from 'fastify';

const authentication : FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const authToken = process.env.AUTH_TOKEN
  if (typeof authToken !== 'string' || authToken.trim().length === 0) {
    throw new Error('AUTH_TOKEN must be configured as a non-empty environment variable')
  }
  fastify.register(bearer, { 
    keys: new Set([authToken])
  })
}
export default authentication