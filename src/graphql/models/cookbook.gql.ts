import { Field, ObjectType } from 'type-graphql';
import { UserGQL } from './userGQL';
import { RecipeGQL } from './recipeGQL';

@ObjectType()
export class CookbookGQL {
  @Field(type => UserGQL)
  creator: UserGQL;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field(type => [RecipeGQL])
  recipes: RecipeGQL[];
}
