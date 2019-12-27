import { Field, ID, ObjectType } from 'type-graphql';
import { RecipeGQL } from './recipeGQL';

@ObjectType()
export class UserGQL {
  @Field(type => ID)
  id: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  password?: string;

  @Field(type => [RecipeGQL])
  recipes: RecipeGQL[];
}
