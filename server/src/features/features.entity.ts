import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TestCase } from 'src/test_cases/test_cases.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class Feature {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [TestCase])
  @OneToMany((type) => TestCase, (testCase) => testCase.feature, {
    nullable: true,
  })
  testCases: TestCase[];
}
