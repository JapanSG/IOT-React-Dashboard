import type {FastifyPluginAsync} from 'fastify';
import {getTemperatures, addTemperature} from '../../services/temps.js';
import { type ZodTypeProvider, serializerCompiler, validatorCompiler } from '@fastify/type-provider-zod'
import {addTempSchema, getTempSchema} from '../../schemas/temp.js';

const tempRoutes : FastifyPluginAsync = async (fastify, options) => {
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);


  fastify.withTypeProvider<ZodTypeProvider>().get('/temp',{schema: {querystring: getTempSchema}} ,async (request, reply) => {
    const num = request.query.num || 10;
    return getTemperatures(num);
  });

  fastify.withTypeProvider<ZodTypeProvider>().post('/temp', { schema: { body: addTempSchema } }, async (request, reply) => {
    const {value, unit}  = request.body;
    const newTemperature = await addTemperature(value, unit);
    return newTemperature;
  });
}

export default tempRoutes;