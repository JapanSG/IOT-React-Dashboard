import Fastify from 'fastify'
import FastifyVite from '@fastify/vite'
import { resolve } from 'node:path';
import { apiV1 } from './controllers/api.js'


const fastify = Fastify({
  logger: true // Enables the built-in pino logger
});

await fastify.register(FastifyVite, {
  root: resolve(import.meta.dirname, '..'), // Step up to the parent directory where vite.config.js lives
  // renderer: '@fastify/react',
  dev: process.env.NODE_ENV !== 'production',
  spa: true
});

console.log(resolve(import.meta.dirname, '..'));


fastify.get('/', async (request, reply) => {
  return reply.html();
});

fastify.register(apiV1, {});

await fastify.vite.ready();

try {
  await fastify.listen({ port: 3000, host: '0.0.0.0' });
}
catch (err) {
  fastify.log.error(err);
  process.exit(1);
}