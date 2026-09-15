import Fastify from "fastify";
import { sequelize } from "./config/database.ts";
import { registerPlugins } from "../src/plugins/index.ts";

const fastify = Fastify({
  logger: true,
});

await registerPlugins(fastify);

try {
  await sequelize.authenticate();
  console.log("database connected");

  await sequelize.sync({ force: true });
  console.log("Tables synced");

  await fastify.listen({
    port: 3000,
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
