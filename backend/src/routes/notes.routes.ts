import type { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance) {
  fastify.get("/", (req, reply) => {
    return reply.code(200).send({ message: "Working" });
  });
}

export default routes;