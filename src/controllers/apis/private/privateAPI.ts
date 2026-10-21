import type { FastifyPluginAsync } from "fastify"
import bearerAuth from "@fastify/bearer-auth"
import humidity from "./humidity.js"
import temp from "./temp.js"

const privateAPI : FastifyPluginAsync = async (fastify, options) => {
  const authToken = process.env.AUTH_TOKEN

  if (!authToken) {
    throw new Error("AUTH_TOKEN environment variable is not set");
  };

  fastify.register(bearerAuth, {
    keys: new Set([authToken]),
  });

  fastify.register(temp);
  fastify.register(humidity);
}

export default privateAPI;