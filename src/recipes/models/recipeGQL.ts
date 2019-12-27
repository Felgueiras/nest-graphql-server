import { Field, ID, ObjectType } from 'type-graphql';
import { UserGQL } from './userGQL';

@ObjectType()
export class RecipeGQL {
  @Field(type => ID)
  id: string;

  @Field(type => UserGQL)
  creator: UserGQL;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field(type => [String])
  ingredients: string[];
}
