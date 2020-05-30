import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: String,
  githubId: String,
  avatarUrl: String,
  password: String,
});
