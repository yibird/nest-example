import {
  IsString,
  IsDefined,
  IsInt,
  IsDateString,
  IsNotEmpty,
  Length,
  IsIn,
  Max,
  Min,
} from 'class-validator';

/**
 * class-validator工具库提供了超级多验证装饰器,这些注解最后一个参数都接收一个ValidationOptions对象,
 * ValidationOptions对象结构如下:
 * export interface ValidationOptions{
 *   //如果验证值为数组,是否必须验证其每个项。
 *   each?: boolean;
 *   //验证失败的错误信息,可以是字符串也可以是返回字符串的函数
 *   message?: string | ((validationArguments: ValidationArguments) => string);
 *   //用于当前验证的验证组
 *   groups?: string[];
 *   //是否执行所有验证,无论使用哪种验证组
 *   always?: boolean;
 *   //
 *   context?: any;
 * }
 */
export class UserDto {
  @IsString({ message: 'userName不是string类型' })
  @IsNotEmpty({ message: 'userName不能为空' })
  @Length(0, 20, { message: 'userName的长度必须大于0小于20' })
  @IsDefined({ message: 'userName不能为空' })
  userName: string;

  @IsInt({ message: 'age不是整形数字' })
  @Min(0, { message: 'age的范围是0到100' })
  @Max(100, { message: 'age的范围是0到100' })
  @IsNotEmpty({ message: 'age不能为空' })
  age: number;

  /**
   * @IsDateString() 验证字符串日期格式,
   * 如果“strict”为“true”，则对有效日期执行其他检查，例如，使日期无效，如“2009-02-29”。
   */
  @IsDateString({ strict: true }, { message: '生日应为日期类型' })
  birthday: Date;

  /**
   * sex为0表示男,1表示女,sex只能枚举0和1
   */
  @IsInt()
  @IsDefined({ message: '性别不能为空' })
  @IsIn([0, 1], { message: '性别只能为0或1' })
  sex: number;
}
