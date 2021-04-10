import { BaseExceptionFilter } from '@nestjs/core';
import { Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    console.log('AllExceptionsFilter...');
    super.catch(exception, host);
  }
}
