import { Module } from '@nestjs/common';
import { CookbookResolver } from './cookbook.resolver';
import { CookbookService } from './cookbook.service';

@Module({
  providers: [CookbookResolver, CookbookService]
})
export class CookbookModule {}
