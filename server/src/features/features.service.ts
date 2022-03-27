import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from './features.entity';
import { CreateFeatureInput, UpdateFeatureInput } from './features.input';

@Injectable()
class FeaturesService {
  public constructor(
    @InjectRepository(Feature) public readonly featureRepo: Repository<Feature>,
  ) {}

  async create(createFeatureInput: CreateFeatureInput): Promise<Feature> {
    const feature = this.featureRepo.create(createFeatureInput);
    return await this.featureRepo.save(feature);
  }

  async findOne(featureId: number): Promise<Feature> {
    const feature = await this.featureRepo.findOne(featureId);
    if (!feature) {
      throw new NotFoundException(`feature #${featureId} not found`);
    }
    return feature;
  }

  async findAll(): Promise<Array<Feature>> {
    return await this.featureRepo.find();
  }

  async update(
    featureId: number,
    updateFeatureInput: UpdateFeatureInput,
  ): Promise<Feature> {
    const feature = await this.featureRepo.preload({
      id: featureId,
      ...updateFeatureInput,
    });
    if (!feature) {
      throw new NotFoundException(`User #${featureId} not found`);
    }
    return this.featureRepo.save(feature);
  }

  async remove(featureId: number): Promise<Feature> {
    const feature = await this.findOne(featureId);
    await this.featureRepo.remove(feature);
    return {
      id: featureId,
      name: '',
      testCases: [],
    };
  }
}

export default FeaturesService;
