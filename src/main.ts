import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import FuncMiddleware from './common/middleware/func.middleware';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //使用全局中间件
  app.use(FuncMiddleware);
  await app.listen(3000);
}
bootstrap();
