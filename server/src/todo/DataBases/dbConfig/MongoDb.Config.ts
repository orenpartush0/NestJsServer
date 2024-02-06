import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ExtendDataBaseTodo} from "src/todo/DataBases/dbEntity/todoMongo";

export const MongoDbConfig:TypeOrmModuleOptions ={
    type: "mongodb",
    host: "mongo",
    port: 27017,
    database: "todos",
    synchronize: false,
    logging: true,
    entities: [ExtendDataBaseTodo],
}
