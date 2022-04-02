import { Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { TestCase } from './test_cases.entity'
import { CreateTestCaseInput, UpdateTestCaseInput } from './test_cases.input'
import { Feature } from 'src/features/features.entity'

@Injectable()
class TestCaseService {
  public constructor(
    @InjectRepository(TestCase)
    public readonly testCaseRepo: Repository<TestCase>,
    @InjectRepository(Feature)
    public readonly featureRepo: Repository<Feature>,
  ) {}

  async create(createTestCaseInput: CreateTestCaseInput): Promise<TestCase> {
    const { name, feature, ...restOfInputs } = createTestCaseInput
    const testCase = this.testCaseRepo.create({
      name,
      feature: {
        id: feature,
      },
      ...restOfInputs,
    })
    return this.testCaseRepo.save(testCase)
  }

  async findOne(testCaseId: number): Promise<TestCase> {
    const feature = await this.testCaseRepo.findOne(testCaseId, {
      relations: ['feature', 'testSteps'],
    })
    if (!feature) {
      throw new NotFoundException(`feature #${testCaseId} not found`)
    }
    return feature
  }

  async findAll(): Promise<Array<TestCase>> {
    return await this.testCaseRepo.find({
      relations: ['feature', 'testSteps'],
    })
  }

  async update(testCaseId: number, updateTestCaseInput: UpdateTestCaseInput): Promise<TestCase> {
    const testCase = await this.testCaseRepo.preload({
      id: testCaseId,
      ...updateTestCaseInput,
    })
    if (!testCase) {
      throw new NotFoundException(`Test Case #${updateTestCaseInput.id} not found`)
    }
    return this.testCaseRepo.save(testCase)
  }

  async remove(testCaseId: number): Promise<TestCase> {
    const testCase = await this.findOne(testCaseId)
    await this.testCaseRepo.remove(testCase)
    return {
      id: testCaseId,
      name: '',
      feature: null,
      testSteps: [],
      description: '',
      createdAt: null,
      prerequisites: '',
      operatingSystems: '',
      duration: 0,
      expectedResult: '',
    }
  }
}

export default TestCaseService
