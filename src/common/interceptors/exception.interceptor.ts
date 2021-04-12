import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  BadGatewayException,
} from '@nestjs/common';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/* 当目标拦截函数中抛出异常时就会catchError()中的逻辑 */
@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {
        console.log('异常信息:', err);
        return throwError(new BadGatewayException());
      }),
    );
  }
}
