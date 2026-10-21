import type {FastifyPluginAsync} from 'fastify';
import { type ZodTypeProvider, serializerCompiler, validatorCompiler } from '@fastify/type-provider-zod'
import { getHumidSchema, addHumidSchema } from '../../schemas/humidity.js';
import { addHumidity, getHumidity } from '../../services/humidity.js';

const humidityRoutes : FastifyPluginAsync = async (fastify, options) => {
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);


  fastify.withTypeProvider<ZodTypeProvider>().get('/humidity',{schema: {querystring: getHumidSchema}} ,async (request, reply) => {
    const num = request.query.num || 10;
    return getHumidity(num);
  });

  fastify.withTypeProvider<ZodTypeProvider>().post('/humidity', { schema: { body: addHumidSchema } }, async (request, reply) => {
    let {value}  = request.body;
    const newTemperature = await addHumidity(value);
    return newTemperature;
  });
}

export default humidityRoutes;
