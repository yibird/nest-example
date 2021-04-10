import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< HEAD
import { ValidationPipe } from './common/pipes/ValidationPipe.pipe';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
=======
import { HttpExceptionFilter } from './common/exception/HttpExceptionFilter';
import { AllExceptionsFilter } from './common/exception/AllExceptionsFilter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  //使用全局异常过滤器,网关或混合应用程序设置过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  //使用全局基础异常处理过滤器方式1
  //app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
>>>>>>> 8b664ce77c12147e53e9acad2691dbb36086aba7
  await app.listen(3000);
}
bootstrap();
