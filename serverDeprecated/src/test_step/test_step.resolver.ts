import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { TestStep } from './test_step.entity'
import { CreateTestStepInput, UpdateTestStepInput } from './input'
import TestStepService from './test_step.service'

@Resolver()
export default class TestStepResolver {
  constructor(private readonly testStepService: TestStepService) {}

  @Mutation(() => TestStep)
  createTestStep(@Args('createTestStepsInput') createTestStepsInput: CreateTestStepInput) {
    return this.testStepService.create(createTestStepsInput)
  }

  @Query(() => [TestStep], { name: 'testSteps' })
  findAll() {
    return this.testStepService.findAll()
  }

  @Query(() => TestStep, { name: 'testStep' })
  findOne(@Args('testStepId', { type: () => String }) testStepId: number) {
    return this.testStepService.findOne(testStepId)
  }

  @Mutation(() => TestStep)
  updateTestSteps(@Args('updateTestStepInput') updateTestStepInput: UpdateTestStepInput) {
    return this.testStepService.update(updateTestStepInput.id, updateTestStepInput)
  }

  @Mutation(() => TestStep)
  removeTestStep(@Args('testStepId', { type: () => String }) testStepId: number) {
    return this.testStepService.remove(testStepId)
  }
}
