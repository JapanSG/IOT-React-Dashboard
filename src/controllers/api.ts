import type { FastifyPluginAsync } from "fastify"
import publicAPI from "./apis/public/publicAPI.js"
import bearerAuth from "@fastify/bearer-auth"
import privateAPI from "./apis/private/privateAPI.js"

export const apiV1 : FastifyPluginAsync = async (fastify, options) => {
  fastify.register(publicAPI);
  fastify.register(privateAPI);
}
