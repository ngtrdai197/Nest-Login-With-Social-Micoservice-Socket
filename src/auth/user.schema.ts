import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: String,
  githubId: String,
  // eslint-disable-next-line @typescript-eslint/camelcase
  avatar_url: String,
});
