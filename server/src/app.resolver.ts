import { Query, Resolver } from '@nestjs/graphql';
import FeaturesService from './features/features.service';

@Resolver()
export class FooResolver {
  constructor(private readonly featuresService: FeaturesService) {}

  @Query(() => String)
  async sayHello(): Promise<string> {
    return `Hello World! ${await this.featuresService.featureRepo.count()}`;
  }
}
