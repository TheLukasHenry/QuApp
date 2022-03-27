import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { FooResolver } from './app.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import FeaturesService from './features/features.service';
import { Feature } from './features/features.entity';
import { FeaturesModule } from './features/features.module';
import { TestCasesModule } from './test_cases/test_cases.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Feature]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    FeaturesModule,
    TestCasesModule,
  ],
  providers: [FooResolver],
})
export class AppModule {}
