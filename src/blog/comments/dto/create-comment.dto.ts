import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ required: true })
  @IsString()
  author: string;

  @ApiProperty({ required: true })
  @IsString()
  article: string;

  @ApiProperty()
  @IsString()
  content: string;
}
