import { UsePipes } from '@nestjs/common';
import {isDate, isNotEmpty, isString} from 'class-validator'
import { DueDateValidationPipe } from 'src/todo/pipe/dueDatePipe'


export class Todo
{
    id:number;

    title:string;

    content:string;
   
    dueDate:Date;

    status:string;

    persistenceMethod:string;

}