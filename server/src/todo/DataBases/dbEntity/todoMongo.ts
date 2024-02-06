import { Column, Entity, ObjectIdColumn } from "typeorm";
import { DataBaseTodo } from "./todoPostgres";
import { ObjectId } from "mongodb";



@Entity({name: 'todos'})
export class ExtendDataBaseTodo extends DataBaseTodo
{
    @ObjectIdColumn()
    _id:ObjectId;
    
    constructor(id:number,Title:string,Content:string,dueDate:number,status:string)
    {
        super(id,Title,Content,dueDate,status);
    };
}