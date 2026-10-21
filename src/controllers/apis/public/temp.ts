import type {FastifyPluginAsync} from 'fastify';
import { type ZodTypeProvider, serializerCompiler, validatorCompiler } from '@fastify/type-provider-zod'
import {getTemperatures, addTemperature} from '../../../services/temps.js';
import {addTempSchema, getTempSchema} from '../../../schemas/temp.js';

const tempRoutes : FastifyPluginAsync = async (fastify, options) => {
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  fastify.withTypeProvider<ZodTypeProvider>().get('/temp',{schema: {querystring: getTempSchema}} ,async (request, reply) => {
    const minute = request.query.minute || 10;
    return getTemperatures(minute);
  });
}

export default tempRoutes;