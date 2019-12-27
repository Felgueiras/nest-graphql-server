import { Injectable, NotFoundException } from '@nestjs/common';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe as RecipeModel } from '../models/recipe';
import { Recipe } from './models/recipe';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel('Recipe')
    private readonly recipeModel: Model<RecipeModel>,
    private usersService: UsersService,
  ) {}

  private readonly recipes: Recipe[] = [];

  /**
   * Create a recipe
   * @param data
   */
  async create(data: NewRecipeInput): Promise<RecipeModel> {
    const newRecipe = { ...data };
    const recipeDto = new CreateRecipeDto(newRecipe);
    const createdRecipe = new this.recipeModel(recipeDto);
    const recipe = await createdRecipe.save();
    // add recipe to user
    const user = await this.usersService.findOne(data.userId);
    await this.usersService.addRecipeToUser(user, recipe._id);
    return recipe;
  }

  async findOneById(id: string): Promise<Recipe> {
    const foundRecipe = this.recipes.find(recipe => recipe.id === id);
    if (!foundRecipe) {
      throw new NotFoundException('Recipe was not found');
    }
    return foundRecipe;
  }

  async findAll(recipesArgs: RecipesArgs): Promise<RecipeModel[]> {
    const recipes: RecipeModel[] = await this.recipeModel.find().exec();
    // TODO: process args
    return recipes;
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
