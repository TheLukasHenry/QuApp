import { Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Feature } from './features.entity'
import { CreateFeatureInput, UpdateFeatureInput } from './features.input'

@Injectable()
class FeaturesService {
  public constructor(@InjectRepository(Feature) public readonly featureRepo: Repository<Feature>) {}

  async create(createFeatureInput: CreateFeatureInput): Promise<Feature> {
    const feature = this.featureRepo.create(createFeatureInput)
    return await this.featureRepo.save(feature)
  }

  async findOne(id: number, relations: string[] | null = null): Promise<Feature> {
    const feature = await this.featureRepo.findOne(id, {
      relations,
    })
    if (!feature) {
      throw new NotFoundException(`feature #${id} not found`)
    }
    return feature
  }

  async findAll(): Promise<Array<Feature>> {
    return await this.featureRepo.find({
      relations: ['testCases', 'testCases.testSteps'],
    })
  }

  async update(id: number, updateFeatureInput: UpdateFeatureInput): Promise<Feature> {
    const feature = await this.featureRepo.preload({
      id,
      ...updateFeatureInput,
    })
    if (!feature) {
      throw new NotFoundException(`User #${id} not found`)
    }
    return this.featureRepo.save(feature)
  }

  async remove(id: number): Promise<Feature> {
    const feature = await this.findOne(id)
    await this.featureRepo.remove(feature)
    return {
      id,
      name: '',
      testCases: [],
      description: '',
      createdAt: null,
    }
  }
}

export default FeaturesService
