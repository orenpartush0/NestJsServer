import { Injectable } from '@nestjs/common';
import {Todo} from './dto/todo.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { DataBaseTodo } from './DataBases/dbEntity/todoPostgres';
import { ExtendDataBaseTodo } from './DataBases/dbEntity/todoMongo';
import { Repository } from 'typeorm';
import { validpersistenceMethodsValues } from './enum/enum';}

export class ToDoService {
    constructor(
      @InjectRepository(DataBaseTodo)
      private readonly postGressRepo: Repository<DataBaseTodo>,
      @InjectRepository(ExtendDataBaseTodo)
      private readonly MongoDbRepo: Repository<ExtendDataBaseTodo>
    ) {}

  health(): string {
    return 'OK';
  }
  private ChooseRepo(persistenceMethod:string){
    if(persistenceMethod==validpersistenceMethodsValues[1])
      return this.MongoDbRepo;
    else if(persistenceMethod==validpersistenceMethodsValues[0])
      return this.postGressRepo;
  }

  async NewTodo(clientData:Todo) {
    if(await this.postGressRepo.findOneBy({rawid:clientData.id})){
        const errormessege='Error: TODO with the title ['+ clientData.id+'] already exists in the system';
        return {errorMessage:errormessege}    
    }
    const id =await this.postGressRepo.count()+1
    this.postGressRepo.insert(new DataBaseTodo(id,clientData.title,
        clientData.content,clientData.dueDate.getDate(),"PENDING"))
        return id;
  }
  async CountByStatus(status:string,persistenceMethod:string){
    return await this.ChooseRepo(persistenceMethod).count({where:{state:status}});
  }

  async getContent(status:string,sortBy:string,persistenceMethod:string){
    return await this.ChooseRepo(persistenceMethod).find({
      where:{state:status},
      order:{[sortBy]:'ASC'}});
  }
  
  async UpdateTodo(id:number, status:string){
    let Error=0;
    if(!await this.postGressRepo.findOneBy({rawid:id})){
        Error=1;
        return {Message:'Error: no such TODO with id '+id,Error:Error};
    }
    let PostGresTodo:DataBaseTodo;
    PostGresTodo= await this.postGressRepo.findOne({where:{rawid:id}})
    PostGresTodo.state=status;
    this.postGressRepo.save(PostGresTodo);

    let MongoDbTodo:ExtendDataBaseTodo;
    MongoDbTodo= await this.MongoDbRepo.findOne({where:{rawid:id}})
    const res=MongoDbTodo.state;
    MongoDbTodo.state=status;
    await this.postGressRepo.save(MongoDbTodo);
    return {Message:res,Error:Error};
  }
  
  async DeleteTodo(id:number){
    let Error=0;
    if(!await this.postGressRepo.findOneBy({rawid:id})){
        Error=1;
        return {Message:'Error: no such TODO with id '+id,Error:Error};
    }
    let PostGresTodo:DataBaseTodo;
    PostGresTodo=await this.postGressRepo.findOneBy({rawid:id})
    await this.postGressRepo.delete(PostGresTodo);

    let MongoDBTodo:ExtendDataBaseTodo;
    MongoDBTodo=await this.MongoDbRepo.findOneBy({rawid:id});
    await this.MongoDbRepo.delete(MongoDBTodo);
    return {Message:await this.MongoDbRepo.count(),Error:Error};
    }
}