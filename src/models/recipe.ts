import { Document } from 'mongoose';

export interface Recipe extends Document {
  readonly title: string;
  readonly description: string;
  readonly password: string;
  readonly creationDate: string;
  readonly ingredients: string[];
}
