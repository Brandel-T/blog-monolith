import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { CommentsService } from '../comments/comments.service';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { NoRolesRequired, Public, Roles } from '../../common/decorators';
import { Role } from '../../core/users/role.enum';

@Controller('articles')
@ApiTags('Articles')
@Roles(Role.AUTHOR, Role.ADMIN)
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  @ApiBody({ type: CreateArticleDto, required: true })
  async create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @Public()
  @NoRolesRequired()
  async findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  async findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', required: true })
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  async remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }

  @Get(':id/comments')
  async findAllComments(@Param('id') articleId: string) {
    return this.articlesService.findAllCommentsOfArticle(articleId);
  }

  @Post(':id/comments')
  @ApiBody({
    type: CreateCommentDto,
    required: true,
    description: 'A comment to this article',
  })
  async createComment(
    @Param('id') articleId: string,
    @Body() commentDto: CreateCommentDto,
  ) {
    return this.commentsService.addCommentToArticle(articleId, commentDto);
  }
}
