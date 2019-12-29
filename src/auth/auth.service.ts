import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../database/models/user';
import { EmailService } from '../email/email.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Register new user.
   * @param user new user info
   */
  async register(user: User) {
    const registeredUser = await this.usersService.register(user);
    return this.generateAccessToken(registeredUser);
  }

  /**
   * Generate a JWT token by signing a payload.
   *
   * @param user user data
   */
  private generateAccessToken(user: CreateUserDto) {
    const payload = {
      username: user.username,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async delete(user: User) {
    await this.usersService.delete(user);
    return null;
  }

  async login(user: CreateUserDto) {
    // check if was registered
    const loggedUser: CreateUserDto = await this.usersService.login(user);
    return this.generateAccessToken(loggedUser);
  }

  /**
   * Recover lost password.
   * @param user user info
   */
  async recoverPassword(user: User) {
    // TODO recover password
    // const loggedUser = await this.usersService.login(user);
    const token = '123';
    // TODO: user mail
    this.emailService.sendEmail(
      'sample@org.com',
      'Password help has arrived!',
      'http://localhost:3000/auth/reset_password?token=' + 'token',
    );
  }
}
