import { Document } from 'mongoose';
import { IComment } from '../../comments/interfaces/comment.interface';

export interface IArticle extends Document {
  title: string;
  description?: string;
  content: string;
  comments?: IComment[];
}
