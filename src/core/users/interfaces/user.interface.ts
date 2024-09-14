import { Document } from 'mongoose';
import { UserProfile } from './user-profile.interface';
import { IComment } from '../../../blog/comments/interfaces/comment.interface';
import { IArticle } from '../../../blog/articles/interfaces/article.interface';

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  profile: UserProfile;
  comments?: IComment[];
  articles?: IArticle[];
}
