import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Feature } from 'src/features/features.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class TestCase {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Feature)
  @ManyToOne((type) => Feature, (feature) => feature.testCases, {})
  feature: Feature;
}
