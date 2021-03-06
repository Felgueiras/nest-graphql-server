import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  userId: Number,
  username: String,
  password: String,
  email: String,
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
    },
  ],
});
