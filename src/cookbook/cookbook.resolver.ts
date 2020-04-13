import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { CurrentUser } from '../decorators/user.decorator';
import { User } from '../database/models/user';
import { CookbookGQL } from '../graphql/models/cookbook.gql';
import { CookbookService } from './cookbook.service';

@Resolver('Cookbook')
export class CookbookResolver {
  constructor(private readonly cookbookService: CookbookService) {}
  @Query(returns => [CookbookGQL])
  @UseGuards(GqlAuthGuard)
  async recipes(@CurrentUser() user: User): Promise<CookbookGQL[]> {
    const recipesModel = await this.cookbookService.findAll(recipesArgs);
    // convert from Model to GQL
    const convertedPromises = recipesModel.map(recipe =>
      this.convertRecipeGQL(recipe),
    );
    return await Promise.all([...convertedPromises]);
  }
}
