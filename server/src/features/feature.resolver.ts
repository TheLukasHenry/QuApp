import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Feature } from './features.entity';
import { CreateFeatureInput, UpdateFeatureInput } from './features.input';
import FeaturesService from './features.service';

@Resolver()
export class FeatureResolver {
  constructor(private readonly featuresService: FeaturesService) {}

  @Query(() => String)
  async sayHello(): Promise<string> {
    return `Hello World! ${await this.featuresService.featureRepo.count()}`;
  }

  @Mutation(() => Feature)
  createFeature(
    @Args('createFeatureInput') createFeaturesInput: CreateFeatureInput,
  ) {
    return this.featuresService.create(createFeaturesInput);
  }

  @Query(() => [Feature], { name: 'features' })
  findAll() {
    return this.featuresService.findAll();
  }

  @Query(() => Feature, { name: 'feature' })
  findOne(@Args('featureId', { type: () => String }) featureId: number) {
    return this.featuresService.findOne(featureId);
  }

  @Mutation(() => Feature)
  updateFeature(
    @Args('updateFeatureInput') updateFeatureInput: UpdateFeatureInput,
  ) {
    return this.featuresService.update(
      updateFeatureInput.id,
      updateFeatureInput,
    );
  }

  @Mutation(() => Feature)
  removeFeature(@Args('featureId', { type: () => String }) featureId: number) {
    return this.featuresService.remove(featureId);
  }
}
