import { IUser } from '../../../core/users/interfaces/user.interface';
import { IArticle } from '../../articles/interfaces/article.interface';

export interface IComment extends Document {
  author: IUser;
  article: IArticle;
  content: string;
}
