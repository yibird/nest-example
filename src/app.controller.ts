import {
  Controller,
  Get,
  Query,
  Req,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpCode,
  Headers,
  Ip,
  Redirect,
  Header,
  HttpStatus,
  Session,
  Bind,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    id: i,
    name: `user-${i}`,
  });
}

/**
 * @Controller可以接收一个参数用于区分路由分组
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * @Query装饰器用于获取请求url的查询参数(?号后面的参数),@Query相当于@Req的res.query,@Query有两种写法:
   * 第一种是正常的方法写法,例如@Query(id:number,name:string),这种写法可以使用ts指定参数类型(推荐)。
   * 第二种是结构写法,例如@Query(){id,name},这种写法无法使用ts指定参数类型。
   *
   * 访问 http://localhost:3000/findUser?id=1&name=user-1
   * 结果为: {"id":1,"name":"user-1"}
   */
  @Get('/findUser')
  findUser(@Query() { id, name }): object {
    return data.filter(
      (item) => item.id == id && item.name.indexOf(name) > -1,
    )[0];
  }

  /**
   *
   * @Body可以获取以x-www-form-urlencoded和raw格式提交的数据
   */
  @Post('/addUser')
  addUser(@Body() body): object {
    /**
     * 假设使用Postman以raw格式提交的数据内容为{"id":1}
     */
    console.log(body); //{id:1}
    return body;
  }

  /**
   * @Param可以获取请求URL中的参数,一般用于获取动态参数,
   * 例如访问localhost:3000/1,下面例子中id的值为1
   */
  @Delete(':id')
  delUser(@Param() { id }): string {
    console.log(id); //1
    return '删除成功';
  }

  /**
   *  @Headers 用于获取请求头对象
   */
  @Get('/getHeader')
  getHeader(@Headers() header): object {
    const obj = {
      'user-agent': 'PostmanRuntime/7.26.3',
      accept: '*/*',
      'postman-token': '1e4c5aa7-918c-4363-bc13-bbfcce27565e',
      host: 'localhost:3000',
      'accept-encoding': 'gzip, deflate, br',
      connection: 'keep-alive',
    };
    return header; // 结果为obj的内容
  }

  /**
   * @Header装饰器用于设置响应头信息。
   * @Ip装饰器用于获取请求ip。
   */
  @Get('/getIp')
  @Header('Cache-Control', 'none')
  getIp(@Ip() ip): string {
    return '请求ip为:' + ip; //请求ip为:::1
  }

  /**
   * @Session用于获取请求Session信息
   */
  @Get('/getSession')
  getSession(@Session() session) {
    return 'session:' + session;
  }

  /**
   * @HttpCode装饰器用于设置响应状态码,如不显示设置默认为200,
   * 当访问localhost:3000/setResCode时状态码为204 No Content
   */
  @Post('/setResCode')
  @HttpCode(204)
  setResCode(): string {
    return '响应成功';
  }

  /**
   *@Redirect装饰器用于路由转发
   */

  @Get('/redirect')
  @Redirect('http://localhost:3000/findAll', 200)
  redirect() {
    return '转发成功';
  }

  /**
   * @Request和@Req装饰器用于设置请求对象,@Req是@Request的简写,它们的作用都是一样的,
   * 通过请求对象可以获取到query、param、body、ip、headers、host、hosts等参数,
   * 像@Query、@Param、@Body、@Ip等等这些装饰器都是对请求对象进一步封装。
   */
  @Get('/findAll')
  findAll(@Req() req): Request {
    /**
     * 假设访问localhost:3000/findAll?name=zxp
     */
    console.log('query:', req.query); //query: { name: 'zxp' }
    console.log('params:', req.params);
    console.log('body:', req.body);
    console.log('headers:', req.headers);
    console.log('ip:', req.ip); //ip: ::1
    console.log('host:', req.host); //host: localhost
    return req;
  }

  /**
   * @Response和@Res装饰器用于设置响应对象,@Res装饰器是@Response的简写,它们的作用是一样的
   * 通过响应对象你可以设置响应状态码、响应格式等等。
   * res.status(HttpStatus.OK) 用于设置响应状态码为200,
   * json()用于将数据转为json格式
   */
  @Get('/findList')
  findList(@Res() res) {
    return res.status(HttpStatus.OK).json({ name: 'zxp', id: 1 });
  }

  /**
   * @Bind装饰器的作用是将包装的装饰器绑定到路由方法的参数,这样可以不用在路由方法中使用装饰器
   * 而获得同样的功能。
   */
  @Bind(Req(), Query())
  bind(req, query) {
    console.log('请求对象:', req);
    console.log('请求查询参数对象:', query);
  }
}
