import type {FastifyPluginAsync} from 'fastify'

const route : FastifyPluginAsync = async (fastify, opts) => {

  fastify.get('/', async function (request, reply) {
    return 'temp'
  });

  fastify.post('/', async function (request, reply) {
    return 'temp'
  });
}

export default route

