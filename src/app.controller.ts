import {
  Controller,
  Get,
  UseInterceptors,
  ForbiddenException,
} from '@nestjs/common';
import { AppService } from './app.service';

import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ExceptionInterceptor } from './common/interceptors/exception.interceptor';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  @UseInterceptors(ExceptionInterceptor)
  hello(): string {
    throw new ForbiddenException('no auth...');
    return 'hello';
  }
}
