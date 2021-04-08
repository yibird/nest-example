import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception/HttpExceptionFilter';
import { AllExceptionsFilter } from './common/exception/AllExceptionsFilter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  //使用全局异常过滤器,网关或混合应用程序设置过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  //使用全局基础异常处理过滤器方式1
  //app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();
