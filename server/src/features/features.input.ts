import { InputType, Field, PartialType, Int } from '@nestjs/graphql'

@InputType()
export class CreateFeatureInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string

  @Field(() => String, { description: 'Example field (placeholder)' })
  description?: string
}

@InputType()
export class UpdateFeatureInput extends PartialType(CreateFeatureInput) {
  @Field(() => Int)
  id: number
}
