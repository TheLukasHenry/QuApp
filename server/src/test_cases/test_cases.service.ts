import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TestCase } from './test_cases.entity';
import { CreateTestCaseInput, UpdateTestCaseInput } from './test_cases.input';

@Injectable()
class TestCaseService {
  public constructor(
    @InjectRepository(TestCase)
    public readonly testCaseRepo: Repository<TestCase>,
  ) {}

  async create(createTestCaseInput: CreateTestCaseInput): Promise<TestCase> {
    const feature = this.testCaseRepo.create(createTestCaseInput);
    return await this.testCaseRepo.save(feature);
  }

  async findOne(testCaseId: number): Promise<TestCase> {
    const feature = await this.testCaseRepo.findOne(testCaseId);
    if (!feature) {
      throw new NotFoundException(`feature #${testCaseId} not found`);
    }
    return feature;
  }

  async findAll(): Promise<Array<TestCase>> {
    console.log('this one');
    return await this.testCaseRepo.find();
  }

  async update(
    testCaseId: number,
    updateTestCaseInput: UpdateTestCaseInput,
  ): Promise<TestCase> {
    const testCase = await this.testCaseRepo.preload({
      id: testCaseId,
      ...updateTestCaseInput,
    });
    if (!testCase) {
      throw new NotFoundException(`User #${testCaseId} not found`);
    }
    return this.testCaseRepo.save(testCase);
  }

  async remove(testCaseId: number): Promise<TestCase> {
    const testCase = await this.findOne(testCaseId);
    await this.testCaseRepo.remove(testCase);
    return {
      id: testCaseId,
      name: '',
      feature: null,
    };
  }
}

export default TestCaseService;
