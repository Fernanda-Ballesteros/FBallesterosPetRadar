import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  PORT: env.get("PORT").default("3000").asPortNumber(),

  MAILER_EMAIL: env.get("MAILER_EMAIL").asString(),
  MAILER_PASSWORD: env.get("MAILER_PASSWORD").asString(),
  MAILER_SERVICE: env.get("MAILER_SERVICE").asString(),

  MAPBOX_TOKEN: env.get("MAPBOX_TOKEN").asString(),

  DB_HOST: env.get("DB_HOST").asString(),
  DB_NAME: env.get("DB_NAME").asString(),
  DB_PORT: env.get("DB_PORT").default("5432").asPortNumber(),
  DB_USER: env.get("DB_USER").asString(),
  DB_PASSWORD: env.get("DB_PASSWORD").asString(),

  REDIS_HOST: env.get("REDIS_HOST").default("localhost").asString(),
  REDIS_PORT: env.get("REDIS_PORT").default("6379").asPortNumber(),

  APPINSIGHTS_CONNECTION_STRING: env
    .get("APPINSIGHTS_CONNECTION_STRING")
    .default("")
    .asString(),
};