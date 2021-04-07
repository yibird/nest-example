import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import FuncMiddleware from './common/middleware/func.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    /**
     * exclude用于排除请求,例如下面例子中表示排除路径为/getUser并且请求类型为get的请求。
     * forRoutes表示中间件只应用于请求url前缀为app的请求。forRoutes中可以使用通配符
     */
    consumer
      .apply(LoggerMiddleware, FuncMiddleware)
      .exclude({ path: '/getUser', method: RequestMethod.GET })
      .forRoutes('app');
  }
}
