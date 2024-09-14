import { CreateUserDto } from '../../../core/users/dto/create-user.dto';
import { CreateArticleDto } from '../../articles/dto/create-article.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  author: CreateUserDto;

  @ApiProperty()
  article: CreateArticleDto;

  @ApiProperty()
  @IsString()
  content: string;
}
