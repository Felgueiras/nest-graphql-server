export class CreateRecipeDto {
  constructor(recipe) {
    this.title = recipe.title;
    this.description = recipe.description;
    this.ingredients = recipe.ingredients;
    this.creator = recipe.userId;
    this.creationDate = new Date();
  }

  readonly title: string;
  readonly description: string;
  readonly ingredients: string[];
  readonly creator: string;
  readonly creationDate: Date;
}
