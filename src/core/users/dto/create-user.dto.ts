import { UserProfile } from '../interfaces/user-profile.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../role.enum';

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

  @ApiProperty({
    type: String,
    default: Role.USER,
    enum: [Role.USER, Role.ADMIN, Role.AUTHOR],
    description: "List of user's roles",
  })
  roles: string[] = [Role.USER];
}
