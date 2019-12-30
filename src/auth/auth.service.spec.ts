import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { EmailModule } from '../email/email.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { DatabaseModule } from '../database/database.module';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from '../users/dto/register-user.dto';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EmailModule,
        UsersModule,
        DatabaseModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '10m' },
        }),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.skip('shouldn login registered user', async () => {
    const user: RegisterUserDto = {
      userId: 123,
      password: '1234',
      email: 'example@org.pt',
      username: '1234',
    };
    jest
      .spyOn(usersService, 'login')
      .mockImplementation(() => Promise.resolve(user));
    expect(await service.login(user)).toBe(user);
  });

  it("shouldn't register user with missing fields", async () => {
    const user: RegisterUserDto = {
      userId: 123,
      password: '1234',
      email: 'example@org.pt',
      username: '1234',
    };
    jest
      .spyOn(usersService, 'login')
      .mockImplementation(() => Promise.resolve(user));
    expect(await service.login(user)).toBe(user);
  });
});
