import {
  Controller,
  Get,
<<<<<<< HEAD
  Param,
  Query,
  ParseIntPipe,
  ParseBoolPipe,
  ParseUUIDPipe,
  DefaultValuePipe,
  UsePipes,
  Post,
  Body,
=======
  HttpException,
  HttpStatus,
  UseFilters,
>>>>>>> 8b664ce77c12147e53e9acad2691dbb36086aba7
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './userDto';
import { ValidationPipe } from './common/pipes/ValidationPipe.pipe';

import { ForbiddenException } from './common/exception/ForbiddenException';

import { HttpExceptionFilter } from './common/exception/HttpExceptionFilter';
import { AllExceptionsFilter } from './common/exception/AllExceptionsFilter';

/**
 * @Controller可以接收一个参数用于区分路由分组
 */
@Controller('/app')
@UseFilters(AllExceptionsFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

<<<<<<< HEAD
  @Get('/hello/:id')
  getHello(@Param('id', new ParseIntPipe()) id): string {
    /**
     * ParseIntPipe管道用于将参数转为数字类型
     * 访问localhost:3000/hello/1
     * 未使用ParseIntPipe前 typeof id的值为string
     * 使用ParseIntPipe后 typeof id的值为number
     */
    console.log(typeof id);
    return this.appService.getHello();
  }

  @Get('/findUser/:bool')
  findUser(@Param('bool', new ParseBoolPipe()) bool) {
    /**
     * ParseIntPipe管道用于将参数转为布尔类型
     * 访问localhost:3000/findUser/true
     * 未使用ParseIntPipe前 typeof id的值为string
     * 使用ParseIntPipe后 typeof id的值为boolean
     */
    return typeof bool;
  }

  @Get('/testParseUUID')
  testParseUUID(@Query('uuid', new ParseUUIDPipe()) uuid) {
    /**
     * ParseUUIDPipe管道用于解析参数是否是uuid。
     * 会使用 UUID 3,4,5版本来解析字符串,你也可以单独设置需要的版本.
     * 访问http://localhost:3000/testParseUUID?uuid=eaf8ea11-c4d7-4272-bc5d-19a70cc9b9a4
     */
    return uuid;
  }

  @Get('/getUser')
  getUser(@Query('name', new DefaultValuePipe('zxp')) name) {
    /**
     * DefaultValuePipe管道用于设置参数默认值。
     * 当传入了name 查询查看那么就会使用传入的name参数,
     * 若未传递name查询参数则name默认为zxp。
     */
    return name;
  }

  @Post('/addUser')
  addUser(@Body(new ValidationPipe()) userdto: UserDto): string {
    return '验证成功';
=======
  @Get('/hello')
  getHello(): string {
    /**
     * 故意抛出一个非HttpException(及其子类)的异常,Nest使用全局异常过滤器对其处理,
     * 默认以json格式响应以下信息:
     * {
        "statusCode": 500,
        "message": "Internal server error"
        }
     */
    throw new Error('手动抛出一个异常....');
    return this.appService.getHello();
  }

  /**
   *  抛出HttpException异常,此异常从@nestjs/common包中导入,HttpException构造函数接收
   *  两个参数,第一个参数是JSON响应主体(response),可以是字符串也可以是对象,
   *  第二个参数是HTTP状态码。
   *
   *  以下例子中当访问 localhost:3000/app/findUser 就会响应如下信息:
   *  {
   *     "statusCode": 403,
   *     "message": "禁止访问"
   *  }
   *  默认情况JSON响应主体包含两个属性响应状态码和响应信息,如果仅要覆盖JSON响应主体的消息部分,
   *  则在response参数提供一个字符串,要覆盖整个JSON响应主体，
   *  请在response参数中传递一个对象。Nest将序列化对象，并将其作为JSON响应正文返回。
   */
  @Get('/findUser')
  findUser() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: '这是自定义异常信息',
      },
      HttpStatus.FORBIDDEN,
    );
  }

  /**
   * 测试自定义异常
   */
  @Get('/testCustomException')
  testCustomException() {
    throw new ForbiddenException();
  }

  /**
   * 测试自定义异常过滤器
   */
  @Get('/testCustomExceptionFilter')
  testCustomExceptionFilter() {
    throw new ForbiddenException();
>>>>>>> 8b664ce77c12147e53e9acad2691dbb36086aba7
  }
}
