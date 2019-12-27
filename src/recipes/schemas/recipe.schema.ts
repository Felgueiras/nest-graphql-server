import * as mongoose from 'mongoose';

export const RecipeSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  creationDate: String,
  ingredients: [String],
});
