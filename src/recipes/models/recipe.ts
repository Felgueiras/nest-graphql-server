import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Recipe {
  @Field(type => ID)
  id: string;

  @Field(type => ID)
  creator: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field(type => [String])
  ingredients: string[];
}
