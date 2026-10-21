import type {FastifyPluginAsync} from 'fastify';
import { type ZodTypeProvider, serializerCompiler, validatorCompiler } from '@fastify/type-provider-zod'
import { getHumidSchema, addHumidSchema } from '../../../schemas/humidity.js';
import { addHumidity, getHumidity } from '../../../services/humidity.js';

const humidityRoutes : FastifyPluginAsync = async (fastify, options) => {
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  fastify.withTypeProvider<ZodTypeProvider>().get('/humidity',{schema: {querystring: getHumidSchema}} ,async (request, reply) => {
    const minute = request.query.minute || 10;
    return getHumidity(minute);
  });
}

export default humidityRoutes;
