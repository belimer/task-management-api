
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { TaskResolver } from 'src/resolvers/task.resolver';
import { TaskService } from 'src/services/task.service';
import { taskProviders } from './task.providers';

@Module({
  imports: [DatabaseModule,
  ],
  
  providers: [TaskResolver, TaskService, ...taskProviders],
})
export class TaskModule {}