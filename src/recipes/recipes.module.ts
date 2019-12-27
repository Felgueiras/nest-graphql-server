import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeSchema } from './schemas/recipe.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }]),
  ],
  providers: [RecipesResolver, RecipesService, DateScalar],
  exports: [RecipesService],
})
export class RecipesModule {}
