import { envs } from "src/config/envs";
import { LostPet } from "src/core/entities/lost-pet.entity";
import { FoundPet } from "src/core/entities/found-pet.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: envs.DATABASE_URL || undefined,
  host: envs.DATABASE_URL ? undefined : envs.DB_HOST,
  database: envs.DATABASE_URL ? undefined : envs.DB_NAME,
  port: envs.DATABASE_URL ? undefined : envs.DB_PORT,
  username: envs.DATABASE_URL ? undefined : envs.DB_USER,
  password: envs.DATABASE_URL ? undefined : envs.DB_PASSWORD,
  synchronize: false,
  entities: [LostPet, FoundPet],
  migrations: ["dist/core/db/migrations/*"]
}

export const dataSource = new DataSource(dataSourceOptions)