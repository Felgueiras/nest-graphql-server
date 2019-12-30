import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';
import { AppModule } from '../app.module';
import { DatabaseModule } from '../database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../database/schemas/user.schema';

describe('UsersService', () => {
  let service: UsersService;

  function initialiseDatabase() {
    console.log('initialising DB');
    return true;
  }

  beforeAll(() => {
    console.log(123);
    initialiseDatabase();
    // return initializeCityDatabase();
    return true;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [
        UsersModule,
        AppModule,
        DatabaseModule,
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
