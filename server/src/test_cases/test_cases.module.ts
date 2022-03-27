import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestCase } from 'src/test_cases/test_cases.entity';
import { TestCasesResolver } from './test_cases.resolver';
import TestCaseService from './test_cases.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestCase])],
  providers: [TestCaseService, TestCasesResolver],
  exports: [TestCaseService],
})
export class TestCasesModule {}
