import Fastify from 'fastify'
import { apiV1 } from './controllers/api.js'

const fastify = Fastify({
  logger: true // Enables the built-in pino logger
});

fastify.get('/', async (request, reply) => {
  return { message: 'Welcome to the Fastify API!' };
});

fastify.register(apiV1, {});

try {
  await fastify.listen({ port: 3000, host: '0.0.0.0' });
}
catch (err) {
  fastify.log.error(err);
  process.exit(1);
}