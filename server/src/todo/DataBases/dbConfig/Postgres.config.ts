import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataBaseTodo } from "src/todo/DataBases/dbEntity/todoPostgres";

export const PostgressConfig:TypeOrmModuleOptions ={
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "todos",
    synchronize: false,
    logging: true,
    entities: [DataBaseTodo]
}

