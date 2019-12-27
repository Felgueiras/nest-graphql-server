import { Document } from 'mongoose';

export interface Recipe extends Document {
  readonly title: string;
  readonly description: string;
  readonly creationDate: Date;
  readonly creator: string;
  readonly ingredients: string[];
  readonly category: string;
}
