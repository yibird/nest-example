import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  RequestTimeoutException,
} from '@nestjs/common';

import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
/**
 * 超时拦截器
 */
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //如果目标拦截器函数未在5s内正常返回则抛出请求超时异常
    return next.handle().pipe(
      timeout(5000),
      catchError((err) => {
        //可以在抛出异常之前添加自定义逻辑,例如释放资源
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      }),
    );
  }
}
