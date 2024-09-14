import { forwardRef, Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { articlesProviders } from './articles.providers';
import { DatabaseModule } from '../../database/database.module';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => CommentsModule)],
  controllers: [ArticlesController],
  providers: [ArticlesService, ...articlesProviders],
  exports: [ArticlesService],
})
export class ArticlesModule {}
