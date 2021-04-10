import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { AuthGuard } from './common/guards/auth.guard';
import { Auth } from './common/decorators/auth.decorator';

@Controller()
@Auth()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  @UseGuards(AuthGuard)
  hello(): string {
    return 'hello';
  }
}
