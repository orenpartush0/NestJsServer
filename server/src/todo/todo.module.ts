import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { ToDoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtendDataBaseTodo } from './DataBases/dbEntity/todoMongo';
import { DataBaseTodo } from './DataBases/dbEntity/todoPostgres';


@Module({
    controllers: [TodoController],
    imports:[
    TypeOrmModule.forFeature([ExtendDataBaseTodo],'mongodb'),
    TypeOrmModule.forFeature([DataBaseTodo],'postgres')
    ],
    providers: [ToDoService],
})
export class TodoModule {}



  