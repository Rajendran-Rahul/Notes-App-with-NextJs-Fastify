import Fastify from "fastify";
import { sequelize } from "./config/database.ts";
import routes from "./routes/notes.routes.ts";

const fastify = Fastify({
  logger: true,
});

fastify.register(routes);

try {
  await sequelize.authenticate();
  console.log("database connected");

  await sequelize.sync();
  console.log("Tables synced");

  await fastify.listen({
    port: 3000,
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
