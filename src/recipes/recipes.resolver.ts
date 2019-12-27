import { NotFoundException, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { RecipeGQL } from './models/recipeGQL';
import { Recipe as RecipeModel } from '../models/recipe';
import { RecipesService } from './recipes.service';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { CurrentUser } from '../decorators/user.decorator';
import { User } from '../models/user';
import { UsersService } from '../users/users.service';

const pubSub = new PubSub();

@Resolver(of => RecipeGQL)
export class RecipesResolver {
  constructor(
    private readonly recipesService: RecipesService,
    private readonly usersService: UsersService,
  ) {}

  @ResolveProperty()
  async creator(@Parent() recipe: RecipeGQL) {
    // TODO: find user
    const creatorID = (recipe as any)._doc.creator;
    const creator = await this.usersService.findOne(creatorID);
    if (!creator) {
      throw new NotFoundException('User not found');
    }
    return creator;
  }

  @Query(returns => RecipeGQL)
  async recipe(@Args('id') id: string): Promise<RecipeGQL> {
    const recipe = await this.recipesService.findOneById(id);
    if (!recipe) {
      throw new NotFoundException(id);
    }
    return recipe;
  }

  @Query(returns => [RecipeGQL])
  @UseGuards(GqlAuthGuard)
  recipes(
    @Args() recipesArgs: RecipesArgs,
    @CurrentUser() user: User,
  ): Promise<RecipeModel[]> {
    return this.recipesService.findAll(recipesArgs);
  }

  private triggerName = 'recipeAdded';

  @Mutation(returns => RecipeGQL)
  @UseGuards(GqlAuthGuard)
  async addRecipe(
    @Args('newRecipeData') newRecipeData: NewRecipeInput,
  ): Promise<RecipeGQL> {
    const recipe = await this.recipesService.create(newRecipeData);
    // trigger subscription
    const ret: RecipeGQL = await this.convertRecipeGQL(recipe);
    // await pubSub.publish(this.triggerName, { recipeAdded: recipe });
    return ret;
  }

  async convertRecipeGQL(recipe: RecipeModel): Promise<RecipeGQL> {
    const { _doc } = recipe as any;
    const copy = { ..._doc } as any;
    copy.creator = await this.usersService.findOne(copy.creator);
    return copy as RecipeGQL;
  }

  @Mutation(returns => Boolean)
  async removeRecipe(@Args('id') id: string) {
    return this.recipesService.remove(id);
  }

  @Subscription(returns => RecipeGQL)
  recipeAdded() {
    return pubSub.asyncIterator(this.triggerName);
  }
}
