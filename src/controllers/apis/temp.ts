import type {FastifyPluginAsync} from 'fastify';
const tempRoutes : FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/temp', async (request, reply) => {
    return { temperature: 25.5, unit: 'C' };
  });

  fastify.post('/temp', async (request, reply) => {
    const { temperature, unit } = request.body as { temperature: number; unit: string };
    return { temperature, unit };
  });
}

export default tempRoutes;