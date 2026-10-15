import bearer from '@fastify/bearer-auth'

export default async function (fastify) {
  const authToken = process.env.AUTH_TOKEN

  if (typeof authToken !== 'string' || authToken.trim().length === 0) {
    throw new Error('AUTH_TOKEN must be configured as a non-empty environment variable')
  }

  fastify.register(bearer, { keys: new Set([authToken]) })
}