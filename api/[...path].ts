import type { IncomingMessage, ServerResponse } from 'node:http'
import { fastify } from '../src/app.js'

export default function handler(request: IncomingMessage, response: ServerResponse) {
  fastify.server.emit('request', request, response)
}
