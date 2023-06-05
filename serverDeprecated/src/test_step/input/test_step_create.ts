import { InputType, Field, Int } from '@nestjs/graphql'

@InputType()
export class CreateTestStepInput {
  @Field(() => String, { description: 'name' })
  name: string

  @Field((type) => Int, {
    description: 'Example field (placeholder)',
  })
  testCase: number
}
