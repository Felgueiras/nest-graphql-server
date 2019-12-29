import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule, UsersModule, DatabaseModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
    appController = module.get<AppController>(AppController);
  });

  describe('service test', () => {
    it('should return "Hello World!"', async () => {
      const result = 'test';
      jest.spyOn(appService, 'helloWorld').mockImplementation(() => result);
      expect(await appController.findAll()).toBe(result);
    });
  });
});
