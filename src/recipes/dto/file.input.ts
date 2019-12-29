import { Field, InputType } from 'type-graphql';
import { RecipeGQL } from '../../graphql/models/recipeGQL';

@InputType()
export class FileInput implements Partial<RecipeGQL> {
  // @Field(type => Stream)
  // stream: Stream;

  @Field() filename: string;

  @Field() mimetype: string;

  @Field() encoding: string;
}
