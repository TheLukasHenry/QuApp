import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestCase } from 'src/test_cases/test_cases.entity';
import { FeatureResolver } from './feature.resolver';
import { Feature } from './features.entity';
import FeaturesService from './features.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feature, TestCase])],
  providers: [FeaturesService, FeatureResolver],
  exports: [FeaturesService],
})
export class FeaturesModule {}
