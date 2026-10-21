import type { FastifyPluginAsync } from "fastify"
import temp from "./apis/temp.js"
import bearerAuth from "@fastify/bearer-auth"
import humidity from "./apis/humidity.js"

export const apiV1 : FastifyPluginAsync = async (fastify, options) => {
  const authToken = process.env.AUTH_TOKEN

  if (!authToken) {
    throw new Error("AUTH_TOKEN environment variable is not set");
  }

  const prefix = "/api/v1";

  fastify.register(bearerAuth, {
    keys: new Set([authToken]),
  });

  fastify.register(temp, {prefix});
  fastify.register(humidity, {prefix});
}
