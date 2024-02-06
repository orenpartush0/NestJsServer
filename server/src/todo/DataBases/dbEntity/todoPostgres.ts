import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'todos'})
export class DataBaseTodo{

    @PrimaryGeneratedColumn()
    rawid:number;

    @Column()
    title:string;

    @Column()
    content:string;

    @Column({ type: 'bigint' })
    duedate: number;

    @Column()
    state:string;

    
    constructor(id:number,Title:string,Content:string,dueDate:number,status:string)
    {
        this.rawid=id;
        this.title=Title;
        this.content=Content;
        this.duedate=dueDate
        this.state=status;
    }
}