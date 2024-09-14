import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Model } from 'mongoose';
import { Article } from './schemas/article.schema';
import { MongooseQueryDto } from '../../common/dto';
import { Comment } from '../comments/schemas/comment.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @Inject('ARTICLE_MODEL') private readonly articleModel: Model<Article>,
  ) {}

  async find(params: MongooseQueryDto<Article>): Promise<Article[]> {
    return this.articleModel.find(params).exec();
  }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articleModel.create(createArticleDto);
  }

  /*
  async addCommentToArticle(
    id: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Article> {
    const article = await this.findOne(id);
    if (!article) {
      throw new NotFoundException(`Article with id ${id} not found`);
    }

    article.comments.push(createCommentDto)
  }
   */

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  async findOne(id: string): Promise<Article> {
    return this.articleModel.findById(id).exec();
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    return this.articleModel.findByIdAndUpdate(id, updateArticleDto).exec();
  }

  async remove(id: string): Promise<Article> {
    return this.articleModel.findByIdAndDelete(id);
  }

  async findAllCommentsOfArticle(articleId: string) {
    const article = await this.articleModel
      .findById(articleId)
      .populate('comments')
      .exec();
    if (!article) {
      throw new NotFoundException(`Article with id ${article._id} not found`);
    }

    return article.comments;
  }
}
