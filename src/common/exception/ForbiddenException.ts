import { HttpException, HttpStatus } from '@nestjs/common';
/**
 * 自定义异常过滤器,需要继承HttpException
 */
export class ForbiddenException extends HttpException {
  constructor(message?: string) {
    //调用父类构造
    super(message || '禁止访问', HttpStatus.FORBIDDEN);
  }
}
