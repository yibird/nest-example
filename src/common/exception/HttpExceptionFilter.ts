import {
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  Catch,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   *
   * @param exception 为捕获的异常类型,exception:HttpException表示捕获HttpException异常
   * @param host
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    //获取上下文
    const ctx: HttpArgumentsHost = host.switchToHttp();
    //根据上下文获取响应对象
    const response = ctx.getResponse<Response>();
    //根据上下文获取请求对象
    const request = ctx.getRequest<Request>();
    //获取捕获异常状态码
    const status = exception.getStatus();
    //设置响应主体
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
