import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../models/user';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  /**
   * Find user by Mongo ID.
   *
   * @param userId Mongo ID
   */
  async findOne(userId: string): Promise<User | undefined> {
    return await this.userModel.findById(userId).exec();
  }

  async addRecipeToUser(user: User, recipeId: string) {
    user.recipes.push(recipeId);
    await user.save();
  }

  async login(user: User): Promise<User> {
    const exists: User = await this.userModel.findOne({
      username: user.username,
    });
    if (!exists) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'User not registered',
        },
        403,
      );
    }
    return exists;
  }

  async delete(user: User) {
    const exists = await this.findOne(user.username);
    if (!exists) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: "User doesn't exist",
        },
        403,
      );
    }
    await this.userModel.deleteOne({ username: user.username });
  }

  /**
   * Register user.
   * @param user
   */
  async register(user: User): Promise<User> {
    const exists = await this.userModel.findOne({
      username: user.username,
    });
    if (exists) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'User already exists',
        },
        403,
      );
    }
    const userDto = new CreateUserDto(user);
    const createdUser = new this.userModel(userDto);
    return await createdUser.save();
  }
}
