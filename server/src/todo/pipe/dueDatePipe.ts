import { PipeTransform,BadRequestException, Injectable, ArgumentMetadata } from '@nestjs/common';
import {isDate} from 'class-validator'
import { Todo } from '../dto/todo.dto';



@Injectable()
export class DueDateValidationPipe implements PipeTransform {
  
  transform(value: Todo, metadata: ArgumentMetadata) {
    try{
    const currentDate= new Date();
    if(!isDate(value.dueDate) || currentDate>value.dueDate ){
        const errormessege='Error: Can’t create new TODO that its due date is in the past';
        throw new BadRequestException({ errorMessage: errormessege });
    }
    return value;
  }
  catch(BadRequestException){};
  }
}