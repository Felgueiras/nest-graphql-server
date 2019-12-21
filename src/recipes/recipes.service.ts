import { Injectable, NotFoundException } from '@nestjs/common';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe';

@Injectable()
export class RecipesService {
  private readonly recipes: Recipe[] = [];

  async create(data: NewRecipeInput): Promise<Recipe> {
    const newRecipe = data as Recipe;
    // set ID
    newRecipe.id = Math.random() + '';
    this.recipes.push(newRecipe);
    return newRecipe;
  }

  async findOneById(id: string): Promise<Recipe> {
    const foundRecipe = this.recipes.find(recipe => recipe.id === id);
    if (!foundRecipe) {
      throw new NotFoundException('Recipe was not found');
    }
    return foundRecipe;
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    // TODO: process args
    return this.recipes.slice();
  }

  async remove(id: string): Promise<boolean> {
    // TODO: remove
    const foundRecipe = this.recipes.findIndex(recipe => recipe.id === id);
    if (foundRecipe === -1) {
      throw new NotFoundException("Recipe doesn't exist");
    }
    const deleted = this.recipes.splice(foundRecipe, 1);
    console.log(deleted, this.recipes);
    return true;
  }
}
