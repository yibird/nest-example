import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

/**
 * @Controller可以接收一个参数用于区分路由分组
 */
@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
