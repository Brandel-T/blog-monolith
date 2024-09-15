import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { NoRolesRequired, Public } from './common/decorators';

@Controller()
@Public()
@NoRolesRequired()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
