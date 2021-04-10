/**
 * 授权装饰器
 */

import { SetMetadata } from '@nestjs/common';

export const Auth = (isAuth: boolean = true) => SetMetadata('auth', isAuth);
