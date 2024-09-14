import { CreateCommentDto } from '../../../blog/comments/dto/create-comment.dto';
import { CreateArticleDto } from '../../../blog/articles/dto/create-article.dto';
import { UserProfile } from '../interfaces/user-profile.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  profile: UserProfile;

  @ApiProperty()
  comments?: CreateCommentDto[];

  @ApiProperty()
  articles?: CreateArticleDto[];
}
