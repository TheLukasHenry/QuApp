import { CreateTestStepInput } from './test_step_create'
import { InputType, Field, PartialType, Int } from '@nestjs/graphql'

@InputType()
export class UpdateTestStepInput extends PartialType(CreateTestStepInput) {
  @Field(() => Int)
  id: number
}
