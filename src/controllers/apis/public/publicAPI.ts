import type { FastifyPluginAsync } from "fastify"
import humidity from "./humidity.js"
import temp from "./temp.js"

const publicAPI : FastifyPluginAsync = async (fastify, options) => {

  fastify.register(temp);
  fastify.register(humidity);
}

export default publicAPI