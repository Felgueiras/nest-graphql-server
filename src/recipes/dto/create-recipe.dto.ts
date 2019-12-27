import { Recipe } from '../models/recipe';

export class CreateRecipeDto {
  constructor(recipe: Recipe) {
    this.title = recipe.title;
    this.description = recipe.description;
    this.ingredients = recipe.ingredients;
  }

  readonly title: string;
  readonly description: string;
  readonly ingredients: string[];
}
