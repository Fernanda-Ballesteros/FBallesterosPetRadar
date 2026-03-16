import { envs } from "src/config/envs";
import { LostPet } from "src/core/entities/lost-pet.entity";
import { FoundPet } from "src/core/entities/found-pet.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions : DataSourceOptions = {

    host: envs.DB_HOST,
    database: envs.DB_NAME,
    port: envs.DB_PORT,
    username: envs.DB_USER,
    password: envs.DB_PASSWORD,
    type: 'postgres',
    synchronize: false,
    entities: [LostPet, FoundPet],
    migrations: ["dist/core/db/migrations/*"]

}

export const dataSource = new DataSource(dataSourceOptions)