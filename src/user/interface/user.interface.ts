import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly username: string;
  readonly githubId: string;
  readonly avatarUrl: string;
  readonly password: string;
}
