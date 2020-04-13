import { Test, TestingModule } from '@nestjs/testing';
import { CookbookResolver } from './cookbook.resolver';

describe('CookbookResolver', () => {
  let resolver: CookbookResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CookbookResolver],
    }).compile();

    resolver = module.get<CookbookResolver>(CookbookResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
