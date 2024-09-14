import { Module } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [CommentsModule, ArticlesModule],
})
export class BlogModule {}
