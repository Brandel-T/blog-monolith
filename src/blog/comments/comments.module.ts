import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { ArticlesModule } from '../articles/articles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, Comment } from './schemas/comment.schema';

@Module({
  imports: [
    forwardRef(() => ArticlesModule),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
