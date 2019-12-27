import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe';
import { Recipe as RecipeModel } from '../models/recipe';
import { RecipesService } from './recipes.service';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { CurrentUser } from '../decorators/user.decorator';
import { User } from '../models/user';

const pubSub = new PubSub();

@Resolver(of => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query(returns => Recipe)
  async recipe(@Args('id') id: string): Promise<Recipe> {
    const recipe = await this.recipesService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Query(returns => [Recipe])
  @UseGuards(GqlAuthGuard)
  recipes(
    @Args() recipesArgs: RecipesArgs,
    @CurrentUser() user: User,
  ): Promise<RecipeModel[]> {
    return this.recipesService.findAll(recipesArgs);
  }

  private triggerName = 'recipeAdded';

  @Mutation(returns => Recipe)
  @UseGuards(GqlAuthGuard)
  async addRecipe(
    @Args('newRecipeData') newRecipeData: NewRecipeInput,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.create(newRecipeData);
    // trigger subscription
    await pubSub.publish(this.triggerName, { recipeAdded: recipe });
    return newRecipeData as Recipe;
  }

  @Mutation(returns => Boolean)
  async removeRecipe(@Args('id') id: string) {
    return this.recipesService.remove(id);
  }

  @Subscription(returns => Recipe)
  recipeAdded() {
    return pubSub.asyncIterator(this.triggerName);
  }
}
