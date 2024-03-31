import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TaskModule } from './modules/task.module';
import { DatabaseModule } from './modules/database.module';
import { TaskService } from './services/task.service';
import { TaskResolver } from './resolvers/task.resolver';
import { databaseProviders } from './database.provider';
import { taskProviders } from './modules/task.providers';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   autoSchemaFile: 'schema.gql',
    // }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true, //make it false for the productions
      // autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      autoSchemaFile: false,
      typePaths: ['./src/schema.graphql'],
   
    }),
    // GraphQLModule.forRoot({
    //   // autoSchemaFile: './schema.gql',
    //   // debug: true,
    //   driver: ApolloDriver,
    //   typePaths: ['src/schema.graphql'],
    //   playground: true,
    // }),
    TaskModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TaskService,
    TaskResolver,
    ...databaseProviders,
    ...taskProviders,
  ],
})
export class AppModule {}
