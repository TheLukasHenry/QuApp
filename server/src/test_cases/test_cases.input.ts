import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTestCaseInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;

  @Field(() => Int, { description: 'Example field (placeholder)' })
  featureId: number;
}

@InputType()
export class UpdateTestCaseInput extends PartialType(CreateTestCaseInput) {
  @Field(() => Int)
  id: number;
}
