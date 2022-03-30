import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Feature } from 'src/features/features.entity'
import { TestStep } from 'src/test_step/test_step.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm'

@ObjectType()
@Entity()
export class TestCase {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String)
  @Column()
  name: string

  @Field(() => Feature)
  @ManyToOne((type) => Feature, (feature) => feature.id)
  @JoinColumn({ name: 'feature', referencedColumnName: 'id' })
  feature: Promise<Feature> | Feature | number

  @Field((type) => [TestStep])
  @OneToMany((type) => TestStep, (testStep) => testStep.testCase, {
    nullable: true,
  })
  testSteps: Promise<TestStep[]> | TestStep[] | undefined
}
