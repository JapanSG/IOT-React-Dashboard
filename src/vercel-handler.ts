import type { IncomingMessage, ServerResponse } from 'node:http'
import { fastify } from './app.js'

export function handleVercelRequest(request: IncomingMessage, response: ServerResponse) {
  fastify.server.emit('request', request, response)
}
