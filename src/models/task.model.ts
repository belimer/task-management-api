// src/user/user.input.ts
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field(() => String, { description: 'title' })
  title:string ;
  @Field(() => String, { description: 'fdesc' })
  description:string;
  @Field(() => String, { description: 'date' })
   dueDate:string;
}
@InputType()
export class UpdateTaskInput {
  @Field()
  _id: string;
}
@InputType()
export class GetTaskInput {
  @Field()
  title:string ;
  @Field()
  description:string;
  @Field()
   dueDate:string;

}
@InputType()
export class ListTasksInput {
  @Field(() => Number, { description: 'classical limit' })
  limit: number;
  @Field(() => Number, { description: 'classical offset' })
  offset: number;
}