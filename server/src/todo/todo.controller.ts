import { Body, Controller, Get,Post,Put, Delete} from '@nestjs/common';
import { ToDoService } from './todo.service';
import {Todo} from './dto/todo.dto'
import {DueDateValidationPipe} from './pipe/dueDatePipe'
import { statusValidationPipe } from './pipe/statusPipe';
import { Query } from '@nestjs/common';
import { persistenceMethodValidationPipe } from './pipe/persistenceMethodPipe';
import { SortByValidationPipe } from './pipe/sortByPipe';


@Controller()
export class TodoController {
  constructor(private readonly todoService: ToDoService) {}

  @Get('/todo/health')
   CheckHealth(): string {
    return this.todoService.health();
  }

  @Post('/todo')
  async CreateNewTodo(@Body(new DueDateValidationPipe()) TodoData:Todo){
    const id=await this.todoService.NewTodo(TodoData);
    return {result:id};
  }

  @Get('/todo/size')
  async CountByStatus(
    @Query('status',new statusValidationPipe())status: string,
    @Query('persistenceMethod',new persistenceMethodValidationPipe())persistenceMethod: string){
    const id=await this.todoService.CountByStatus(status,persistenceMethod);
    return {result:id};
  }

  @Get('/todo/content')
  async getContent(
    @Query('status',new statusValidationPipe())status: string,
    @Query('sortBy',new SortByValidationPipe())sortBy: string,
    @Query('persistenceMethod',new persistenceMethodValidationPipe())persistenceMethod: string)
  { 
    const ToDoArr=await this.todoService.getContent(status,sortBy,persistenceMethod);
    return {result:ToDoArr};
  }

  @Put('/todo')
  async UpdateTodo(
    @Query('status',new statusValidationPipe())status: string,
    @Query()id:number
  ){
    const LateStatus=await this.todoService.UpdateTodo(id,status);
    if(LateStatus.Error)
        return {errorMessage:LateStatus.Message};
    else
        return{result:LateStatus.Message};
  }
  
  @Delete()
  async DeleteTodo(@Query('id')id:number){
    const res=await this.todoService.DeleteTodo(id);
    if(res.Error)
        return {errorMessage:res.Message};
    else
        return{result:res.Message};
  }
}