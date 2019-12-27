import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeSchema } from '../database/schemas/recipe.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }]),
  ],
  providers: [RecipesResolver, RecipesService, DateScalar],
  exports: [RecipesService],
})
export class RecipesModule {}
