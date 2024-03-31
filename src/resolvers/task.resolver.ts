
// src/task/task.resolver.ts
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateTaskInput, ListTasksInput, UpdateTaskInput } from 'src/models/task.model';
import { Task } from 'src/schema/task.schema';
import { TaskService } from 'src/services/task.service';
@Resolver(() => Task)
export class TaskResolver {
  constructor(private taskService: TaskService) {}

 @Mutation(() => Task)
createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput): Promise<Task> {
  
  return this.taskService.create(createTaskInput);
}

  @Query(() => [Task])
  async tasks() {
    return this.taskService.find();
  }
  
  @Query(() => [Task], { name: 'tasks' })
  findAll(@Args('listTasksInput') listTasksInput: ListTasksInput) {
    return this.taskService.findAll(listTasksInput);
  }
  @Query(() => [Task], { name: 'allTasks' })
  findAllUnpaginated() {
    return this.taskService.findAllNotPaginated();
  }
  
  @Query(() => Task, { name: 'oneTask' })
  findOne(@Args('title', { type: () => String }) title: string) {
    return this.taskService.findOne(title);
  }
  @Query(() => Task, { name: 'findById' })
  findById(@Args('_id', { type: () => String }) id: string) {
    return this.taskService.findById(id);
  }
  @Mutation(() => Task)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.taskService.update(updateTaskInput._id, updateTaskInput);
  }
  @Mutation()
  deleteTask(@Args('_id', { type: () => String }) id: string) {
    return this.taskService.deleteTask(id);
  }
}