import { Body, Controller, Get, Query, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TaskService } from './services/task.service';
import { Task } from './schema/task.schema';
import { CreateTaskInput } from './models/task.model';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private  taskService: TaskService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/task')
  createTask(@Body() task:CreateTaskInput):Promise<Task >{
    return this.taskService.create(task);
  }
  @Get('/tasks')
  findTasks(): any {
    return this.taskService.find();
  }
   @Get('/findOne')
   findOneTask(@Query() query: string):any
   {
    // console.log(query)
    // console.log(this.taskService.findOne(query));
    return this.taskService.findOne(query);
  }
}
