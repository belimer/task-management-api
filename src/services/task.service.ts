// src/task/task.service.ts
import { FilterQuery, Model, Query} from 'mongoose';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Task } from 'src/schema/task.schema';
import { CreateTaskInput, ListTasksInput, UpdateTaskInput } from 'src/models/task.model';

@Injectable()
export class TaskService {

 
  constructor(
    @Inject('TASK_MODEL')
    private taskModel: Model<Task>,
  ) {}

  create(createTaskInput: CreateTaskInput) {
    console.log(createTaskInput.description)
    const task = new this.taskModel(createTaskInput);
    return task.save();
  }


  async find(): Promise<Task[]> {
    return this.taskModel.find().lean();
  }
  findAll(paginationQuery: ListTasksInput) {
    const { limit, offset } = paginationQuery;
    return this.taskModel.find().skip(offset).limit(limit).exec();
  }
  findAllNotPaginated(): Promise<Task[]> {
    console.log("fetching")

    // const { limit, offset } = paginationQuery;
    return this.taskModel.find().lean();
  }

async findOne(query: string): Promise<Task | null> {
    try {
      const foundTask = await this.taskModel.findOne({title:query}).lean();
      return foundTask; // Return the found task or null if not found
    } catch (error) {
      // Handle any errors that occur during the database operation
      throw new Error(`Failed to find task: ${error.message}`);
    }
  }
  async findById(id: string):Promise<Task | null>{
    try {
      // Call the findOne method of the TaskModel to find a task based on the provided query
      const foundTask = await this.taskModel.findOne({_id:id}).lean();
      return foundTask; // Return the found task or null if not found
    } catch (error) {
      // Handle any errors that occur during the database operation
      throw new Error(`Failed to find task: ${error.message}`);
    }
  }
  
  async update(id: string, updateTaskInput: UpdateTaskInput) {
    const existingTask = await this.taskModel
      .findOneAndUpdate({ _id: id }, { $set: updateTaskInput }, { new: true })
      .exec();

    if (!existingTask) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return existingTask;
  }
  async deleteTask(id: string) {
    try {
      const deleteResult = await this.taskModel.deleteOne({ _id: id }).exec();
      return deleteResult.deletedCount === 1;
    } catch (error) {
      // Handle errors here
      throw new Error(`Failed to delete task: ${error.message}`);
    }
  }

}