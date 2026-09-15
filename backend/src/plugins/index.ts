// plugins/index.ts
import type { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import routes from "../routes/notes.routes.ts";

export async function registerPlugins(fastify: FastifyInstance) {
  await fastify.register(cors, {
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
  });

  await fastify.register(routes);
}
