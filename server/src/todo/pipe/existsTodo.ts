import { PipeTransform,BadRequestException, Injectable, ArgumentMetadata } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../dto/todo.dto';
import { DataBaseTodo } from '../DataBases/dbEntity/todoPostgres';import { Repository } from 'typeorm';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';


@Injectable()
export class ExistsValidationPipe implements PipeTransform {

    constructor(@InjectRepository(DataBaseTodo,'postgres')
    private readonly postGressRepo:Repository<DataBaseTodo>){};
    
    transform(value: Todo, metadata: ArgumentMetadata) {

    }
}