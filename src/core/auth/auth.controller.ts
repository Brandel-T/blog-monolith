import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { NoRolesRequired, Public } from '../../common/decorators';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  @Public()
  @NoRolesRequired()
  singIn(@Body() signInDto: SignInDto) {
    const { username, password } = signInDto;
    return this.authService.signIn(username, password);
  }
}
