import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';

import { Observable, of } from 'rxjs';
@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const isCached = true;
    if (isCached) {
      //of()运算符会创建并返回一个新的流
      return of([]);
    }
    return next.handle();
  }
}
