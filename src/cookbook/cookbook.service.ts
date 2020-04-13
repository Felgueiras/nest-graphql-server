import { Injectable } from '@nestjs/common';
import { Recipe as RecipeModel } from '../database/models/recipe';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CookbookService {
  constructor(
    @InjectModel('Cookbook')
    private readonly recipeModel: Model<RecCookipeModel>,
  ) {}
  /**
   * Get all recipes.
   */
  async findAll(): Promise<RecipeModel[]> {
    return await this.recipeModel.find().exec();
  }
}
