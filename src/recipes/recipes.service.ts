import { Injectable, NotFoundException } from '@nestjs/common';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe, Recipe as RecipeModel } from '../database/models/recipe';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UsersService } from '../users/users.service';
import { User } from '../database/models/user';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel('Recipe')
    private readonly recipeModel: Model<RecipeModel>,
    private usersService: UsersService,
  ) {}

  /**
   * Create a recipe
   * @param data
   */
  async create(data: NewRecipeInput): Promise<RecipeModel> {
    // convert input to DTO
    const recipeDto = new CreateRecipeDto({ ...data });
    const createdRecipe = new this.recipeModel(recipeDto);
    const recipe = await createdRecipe.save();
    // add recipe to user
    const user = await this.usersService.findOne(data.userId);
    await this.usersService.addRecipeToUser(user, recipe._id);
    return recipe;
  }

  /**
   * Find recipe by ID.
   * @param id
   */
  async findOneById(id: string): Promise<RecipeModel> {
    const foundRecipe = await this.recipeModel.findById(id);
    if (!foundRecipe) {
      throw new NotFoundException('Recipe was not found');
    }
    return foundRecipe;
  }

  async filterByCategory(category: string): Promise<RecipeModel[]> {
    return this.recipeModel.find({ category });
  }

  /**
   * Get all recipes.
   * @param recipesArgs
   */
  async findAll(recipesArgs: RecipesArgs): Promise<RecipeModel[]> {
    // TODO: process args
    return await this.recipeModel.find().exec();
  }

  async remove(id: string): Promise<boolean> {
    const deleted: RecipeModel = await this.recipeModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException("Recipe doesn't exist");
    }
    // remove from user
    const user = await this.usersService.findOne(deleted.creator);
    await this.usersService.removeRecipeFromUser(user, id);
    return true;
  }

  async userRecipes(user: User): Promise<RecipeModel[]> {
    return await this.recipeModel.find({ creator: user.userId }).exec();
  }

  async setPhoto(recipeId: string, file: any) {
    const buff = new Buffer(JSON.stringify(file));
    const base64data = buff.toString('base64');
    return this.recipeModel.findOneAndUpdate({}, { photo: base64data });
  }
}
