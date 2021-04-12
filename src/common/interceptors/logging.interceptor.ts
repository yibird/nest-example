import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
/**
 * 我们可以把拦截器理解为函数增强器,它能对目标函数进行增强,拦截器受AOP(面向切面编程)思想启发,
 * 可以在目标函数之前或之后进行绑定额外的逻辑。拦截器可以实现对目标方法返回结果的转换,也可以实现对目标
 * 函数的异常处理转换,拦截器可以扩展目标函数。
 *
 * 自定义拦截器需要满足以下两个条件:
 * (1).需要被@Injectable()装饰器装饰。
 * (2).需要实现NestInterceptor接口,重写intercept()函数,intercept()函数接收两个参数,
 * 第一个参数是ExecutionContext执行上下文对象,ExecutionContext继承自ArgumentsHost对象,并提供了更多扩展功能,
 * 第二参数是一个CallHandler对象,CallHandler是一个包装执行流的对象,如果不调用CallHandler对象的handler()函数,
 * 那么就不会执行拦截的目标函数。intercept()函数返回一个Observable对象,Observable对象由rxjs导出,
 * Observable对象提供了一组非常强大的运算符,可以帮助我们进行例如响应操作。
 *
 * NestInterceptor<T，R> 是一个通用接口，其中 T 表示已处理的 Observable<T> 的类型（在流后面）
 * ，而 R 表示包含在返回的 Observable<R> 中的值的返回类型。
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('在拦截器拦截目标方法前执行...');
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log(`在拦截器拦截目标方法后执行...,耗时:${Date.now() - now}ms`);
      }),
    );
  }
}
