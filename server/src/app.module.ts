import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgressConfig } from './todo/DataBases/dbConfig/Postgres.config';
import {MongoDbConfig} from './todo/DataBases/dbConfig/MongoDb.Config'
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [
  TypeOrmModule.forRoot(MongoDbConfig),
  TypeOrmModule.forRoot(PostgressConfig),
  TodoModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
