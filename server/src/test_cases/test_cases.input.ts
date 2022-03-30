import { InputType, Field, PartialType, Int, OmitType } from '@nestjs/graphql';
import { Feature } from 'src/features/features.entity';

@InputType()
export class CreateTestCaseInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;

  @Field((type) => Int, {
    description: 'Example field (placeholder)',
  })
  feature: number;
}

@InputType()
export class UpdateTestCaseInput extends OmitType(
  PartialType(CreateTestCaseInput),
  ['feature'],
) {
  @Field(() => Int)
  id: number;
}
