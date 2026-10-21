import type {FastifyPluginAsync} from 'fastify';
import { type ZodTypeProvider, serializerCompiler, validatorCompiler } from '@fastify/type-provider-zod'
import {getTemperatures, addTemperature} from '../../services/temps.js';
import {addTempSchema, getTempSchema} from '../../schemas/temp.js';

const tempRoutes : FastifyPluginAsync = async (fastify, options) => {
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);


  fastify.withTypeProvider<ZodTypeProvider>().get('/temp',{schema: {querystring: getTempSchema}} ,async (request, reply) => {
    const num = request.query.num || 10;
    return getTemperatures(num);
  });

  fastify.withTypeProvider<ZodTypeProvider>().post('/temp', { schema: { body: addTempSchema } }, async (request, reply) => {
    let {value, unit}  = request.body;
    if (unit == 'F') {
      // Convert Fahrenheit to Celsius
      value = (value - 32) * 5 / 9;
    }
    const newTemperature = await addTemperature(value, unit);
    return newTemperature;
  });
}

export default tempRoutes;