import { Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { TestStep } from './test_step.entity'
import { CreateTestStepInput, UpdateTestStepInput } from './input'

@Injectable()
class TestStepService {
  public constructor(
    @InjectRepository(TestStep)
    public readonly testStepRepo: Repository<TestStep>,
  ) {}

  async create(createTestStepInput: CreateTestStepInput): Promise<TestStep> {
    const { name } = createTestStepInput
    const testStep = this.testStepRepo.create({
      name,
      testCase: {
        id: createTestStepInput.testCase,
      },
    })
    return this.testStepRepo.save(testStep)
  }

  async findOne(testStepId: number): Promise<TestStep> {
    const testStep = await this.testStepRepo.findOne(testStepId)
    if (!testStep) {
      throw new NotFoundException(`testStep not found`)
    }
    return testStep
  }

  async findAll(): Promise<Array<TestStep>> {
    return await this.testStepRepo.find()
  }

  async update(testStepId: number, updateTestStepInput: UpdateTestStepInput): Promise<TestStep> {
    const testStep = await this.testStepRepo.preload({
      id: testStepId,
      ...updateTestStepInput,
    })
    if (!testStep) {
      throw new NotFoundException(`testStep not found`)
    }
    return this.testStepRepo.save(testStep)
  }

  async remove(testStepId: number): Promise<TestStep> {
    const testStep = await this.findOne(testStepId)
    await this.testStepRepo.remove(testStep)
    return {
      id: testStepId,
      name: '',
      createdAt: null,
      testCase: null,
    }
  }
}

export default TestStepService
