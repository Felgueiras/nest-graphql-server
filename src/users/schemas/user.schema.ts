import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  userId: Number,
  username: String,
  // TODO: do not store pain text password
  password: String,
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
    },
  ],
});
