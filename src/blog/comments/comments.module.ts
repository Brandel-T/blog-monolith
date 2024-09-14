import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { DatabaseModule } from '../../database/database.module';
import { commentsProviders } from './comments.providers';
import { ArticlesModule } from '../articles/articles.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => ArticlesModule)],
  controllers: [CommentsController],
  providers: [CommentsService, ...commentsProviders],
  exports: [CommentsService],
})
export class CommentsModule {}
