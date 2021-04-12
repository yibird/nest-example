import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExcludeNullInterceptor } from './common/interceptors/excludeNull.interceptor';
import { ExceptionInterceptor } from './common/interceptors/exception.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(
    new ExcludeNullInterceptor(),
    new ExceptionInterceptor(),
    new TimeoutInterceptor(),
  );
  app.listen(3000);
}
bootstrap();
