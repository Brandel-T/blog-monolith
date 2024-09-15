import { UserProfile } from '../interfaces/user-profile.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
  /*
  @IsNotEmpty()
  @IsString()
  @IsEmail()
   */
  email: string;

  @ApiProperty()
  profile: UserProfile;

  @ApiProperty()
  @IsArray()
  comments?: string[] = [];

  @ApiProperty()
  @IsArray()
  articles?: string[] = [];
}
