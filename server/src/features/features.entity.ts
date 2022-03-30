import { Field, Int, ObjectType } from '@nestjs/graphql'
import { TestCase } from 'src/test_cases/test_cases.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany,JoinColumn } from 'typeorm'

@ObjectType()
@Entity()
export class Feature {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String)
  @Column()
  name: string

  @Field((type) => [TestCase])
  @OneToMany((type) => TestCase, (testCase) => testCase.feature, {
    nullable: true,
  })
  testCases: Promise<TestCase[]> | TestCase[] | undefined
}
