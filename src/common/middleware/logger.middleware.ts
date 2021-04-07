/**
 * 自定义middleware只需两步操作,第一使用@Injectable装饰器将中间件注入到IOC容器,
 * 第二步是实现NestMiddleware接口重写该接口的use方法。
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('我是Logger Middleware');
    next();
  }
}
