import type { FastifyPluginAsync } from "fastify"
import publicAPI from "./apis/public/publicAPI.js"
import bearerAuth from "@fastify/bearer-auth"
import privateAPI from "./apis/private/privateAPI.js"

export const apiV1 : FastifyPluginAsync = async (fastify, options) => {

  const prefix = "/api/v1";

  fastify.register(publicAPI, {prefix});
  fastify.register(privateAPI, {prefix});
}
