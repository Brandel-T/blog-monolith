import { Mongoose } from 'mongoose';
import { Comment, CommentSchema } from './schemas/comment.schema';

export const commentsProviders = [
  {
    provide: 'COMMENT_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model(Comment.name, CommentSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
