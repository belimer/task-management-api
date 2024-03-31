// src/task/task.schema.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Task {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
  @Prop()
  @Field(() => String, { description: 'Task title ' })
  title: string;
  @Prop()
  @Field(() => String, { description: 'task description ' })
  description: string;
  @Prop()
  @Field(() => String, { description: 'task due date ' })
  dueDate: string;;
}
export const TaskSchema = SchemaFactory.createForClass(Task);