import Fastify from 'fastify'
import FastifyVite from '@fastify/vite'
import { resolve } from 'node:path';
import Device from './simulate/device.js'
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

new Device().run();

if (process.env.NODE_ENV !== 'production'){
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
        console.log("start on 3000")
  }
  catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
else {
  try {
    await fastify.listen({ port: 443, host: '0.0.0.0' });
    console.log("start on 443")
  }
  catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
