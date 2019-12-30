import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../database/models/user';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import { compare, hash } from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';

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

  async removeRecipeFromUser(user: User, recipeId: string) {
    const index = user.recipes.indexOf(recipeId);
    user.recipes.splice(index, 1);
    await user.save();
  }

  async login(user: LoginUserDto): Promise<boolean> {
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
    // validate password
    const isEqual = await compare(user.password, exists.password);
    if (!isEqual) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'User password mismatch',
        },
        403,
      );
    }
    return true;
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
  async register(user: RegisterUserDto): Promise<User> {
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
    // store hashed password
    const password = await hash(user.password, 12);
    const mongoUser = { ...user, password };
    const createdUser = new this.userModel(mongoUser);
    return await createdUser.save();
  }
}
