import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Feature } from 'src/features/features.entity';
import { TestCase } from './test_cases.entity';
import { CreateTestCaseInput, UpdateTestCaseInput } from './test_cases.input';
import TestCaseService from './test_cases.service';

@Resolver()
export class TestCasesResolver {
  constructor(private readonly testCaseService: TestCaseService) {}

  @Mutation(() => TestCase)
  createTestCase(
    @Args('createTestCasesInput') createTestCasesInput: CreateTestCaseInput,
  ) {
    return this.testCaseService.create(createTestCasesInput);
  }

  @Query(() => [TestCase], { name: 'testCases' })
  findAll() {
    return this.testCaseService.findAll();
  }

  @Query(() => TestCase, { name: 'testCase' })
  findOne(@Args('testCaseId', { type: () => String }) testCaseId: number) {
    return this.testCaseService.findOne(testCaseId);
  }

  @Mutation(() => TestCase)
  updateTestCases(
    @Args('updateTestCaseInput') updateTestCaseInput: UpdateTestCaseInput,
  ) {
    return this.testCaseService.update(
      updateTestCaseInput.id,
      updateTestCaseInput,
    );
  }

  @Mutation(() => TestCase)
  removeTestCase(
    @Args('testCaseId', { type: () => String }) testCaseId: number,
  ) {
    return this.testCaseService.remove(testCaseId);
  }
}
