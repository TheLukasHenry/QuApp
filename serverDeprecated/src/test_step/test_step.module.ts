import { Module } from '@nestjs/common'
import TestStepService from './test_step.service'
import TestStepResolver from './test_step.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TestStep } from './test_step.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TestStep])],
  providers: [TestStepResolver, TestStepService],
  exports: [TestStepResolver, TestStepService],
})
export class TestStepModule {}
