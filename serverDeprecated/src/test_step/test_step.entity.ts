import { ObjectType, Field, Int } from '@nestjs/graphql'
import { TestCase } from 'src/test_cases/test_cases.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'

@ObjectType()
@Entity({
  name: 'test_step',
})
export class TestStep {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String, { description: 'name' })
  @Column()
  name: string

  @Field(() => String)
  @Column({ default: '' })
  expectedResult: string

  @Field(() => TestCase)
  @ManyToOne((type) => TestCase, (testCase) => testCase.id)
  @JoinColumn({ name: 'test_case', referencedColumnName: 'id' })
  testCase: Promise<TestCase> | TestCase | number

  @Field(() => Date, { description: 'created date' })
  createdAt: Date
}
