import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from 'src/features/features.entity';
import { TestCase } from 'src/test_cases/test_cases.entity';
import { TestCasesResolver } from './test_cases.resolver';
import TestCaseService from './test_cases.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestCase, Feature])],
  providers: [TestCaseService, TestCasesResolver],
  exports: [TestCaseService],
})
export class TestCasesModule {}
