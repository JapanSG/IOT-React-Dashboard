export default async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return 'temp'
  });

  fastify.post('/', async function (request, reply) {
    return 'temp'
  });
}
