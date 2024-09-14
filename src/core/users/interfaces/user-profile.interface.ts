import { ApiProperty } from '@nestjs/swagger';

export class UserProfile {
  @ApiProperty()
  bio?: string;
  @ApiProperty()
  avatar?: string;
  @ApiProperty()
  pictureUrl?: string;
}
