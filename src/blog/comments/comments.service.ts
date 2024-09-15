import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { ArticlesService } from '../articles/articles.service';
import { MongooseQueryDto } from '../../common/dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly articleService: ArticlesService,
  ) {}

  async find(params: MongooseQueryDto<Comment>): Promise<Comment[]> {
    return this.commentModel.find(params).exec();
  }

  private async create(
    commentPayload: CreateCommentDto | Comment,
  ): Promise<Comment> {
    return this.commentModel.create(commentPayload);
  }

  async addCommentToArticle(
    articleId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const article = await this.articleService.findOne(articleId);
    if (!article) {
      throw new NotFoundException(`Article with id ${articleId} not found`);
    }

    const newComment = await this.create({
      ...createCommentDto,
      article: article.id,
    });

    article.comments.push(newComment.id);
    await article.save(); // update article

    return newComment;
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  async findOne(id: string): Promise<Comment> {
    return this.commentModel.findById(id).exec();
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentModel.findByIdAndUpdate(id, updateCommentDto).exec();
  }

  async remove(id: number): Promise<Comment> {
    return this.commentModel.findByIdAndDelete(id).exec();
  }
}
