import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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

  private generateAccessToken(registeredUser: User) {
    const payload = {
      username: registeredUser.username,
      sub: registeredUser.userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async delete(user: User) {
    await this.usersService.delete(user);
    return null;
  }

  async login(user: User) {
    // check if was registered
    const loggedUser = await this.usersService.login(user);
    return this.generateAccessToken(loggedUser);
  }
}
