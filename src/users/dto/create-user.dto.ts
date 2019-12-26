import { User } from '../../models/user';

export class CreateUserDto {
  constructor(user: User) {
    this.userId = user.userId;
    this.username = user.username;
    this.password = user.password;
  }

  readonly  userId: number;
  readonly username: string;
  readonly password: string;
}
