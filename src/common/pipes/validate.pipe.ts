import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

/**
 * 管道应该具有@Injectable()装饰的类,且应实现PipeTransform接口,重写transform()
 * PipeTransform<T, R> 是一个通用接口，其中 T 表示 value 的类型，R 表示 transform() 方法的返回类型。
 * transform()拥有value和metadata两个参数,value 是当前处理的参数,metadata是其元数据,元数据对象包含一些属性:
 * export interface ArgumentMetadata {
 *  type: 'body' | 'query' | 'param' | 'custom';
 *  metatype?: Type<unknown>;
 *  data?: string;
 * }
 * type:告诉我们该属性是一个 body @Body()，query @Query()，param @Param() 还是自定义参数。
 * metatype:属性的元类型，例如 String。 如果在函数签名中省略类型声明，或者使用原生 JavaScript，则为 undefined。
 * data:传递给装饰器的字符串，例如 @Body('string')。 如果您将括号留空，则为 undefined。
 */
@Injectable()
export class ValidationPipe implements PipeTransform<string> {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('参数是:', value);
    console.log('参数的元数据是:', metadata);
    throw new Error('Method not implemented.');
  }
}
