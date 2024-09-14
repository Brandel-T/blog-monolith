import { Mongoose } from 'mongoose';
import { Article, ArticleSchema } from './schemas/article.schema';

export const articlesProviders = [
  {
    provide: 'ARTICLE_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model(Article.name, ArticleSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
