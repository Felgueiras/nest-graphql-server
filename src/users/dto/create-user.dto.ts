import { User } from '../../database/models/user';

export class CreateUserDto {
  constructor(user: User, password: string) {
    this.userId = user.userId;
    this.username = user.username;
    this.password = password;
  }

  readonly userId: number;
  readonly username: string;
  readonly password: string;
}
