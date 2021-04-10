/**
 * 自定义守卫需要满足以下两个要求:
 * (1).使用@Injectable()装饰器装饰
 * (2).守卫类需实现CanActivate接口,并重写canActivate()函数,canActivate()返回一个布尔值来表示是否允许请求通过,
 * canActivate()函数接收单个参数ExecutionContext实例,ExecutionContext继承自ArgumentsHost,
 * ExecutionContext相比较ArgumentsHost提供了更多功能。我们可以通过ExecutionContext获取请求或响应对象。
 *
 * AuthGuard的作用是验证请求的请求头是否携带头,若请求携带请求头则允许请求到路由方法,否则将抛出错误,
 * 这里使用@Auth()装饰器来装饰器需要验证的路由方法,若装饰器了@Auth()则需要验证,否则不需要验证,
 * 这里是使用nest提供了反射器工具Reflector
 */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
@Injectable()
export class AuthGuard implements CanActivate {
  //通过构造函数将Reflector注入进来
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const auth = this.reflector.get<string[]>(
      'auth',
      context.getClass() || context.getHandler(),
    );

    console.log(auth);

    //如果未使用@Auth() 或 @Auth(false) 则不需要验证正常通过
    if (!auth) return true;

    //否则验证请求对象请求头是否含有token
    const request: Request = context.switchToHttp().getRequest();
    const header = request.headers;
    //判断请求头是否有token,若token为空则抛出错误
    if (!header.token) {
      throw new UnauthorizedException('');
    }
    return true;
  }
}
