import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  ParseBoolPipe,
  ParseUUIDPipe,
  DefaultValuePipe,
  UsePipes,
  Post,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './userDto';
import { ValidationPipe } from './common/pipes/ValidationPipe.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
  }
}
