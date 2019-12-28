import { Document } from 'mongoose';

export interface User extends Document {
  readonly userId: number;
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly recipes: string[];
}
