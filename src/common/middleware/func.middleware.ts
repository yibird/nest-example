/**
 * 函数中间件
 */
import { Request, Response, NextFunction } from 'express';
export default function (req: Request, res: Response, next: NextFunction) {
  console.log('我是函数中间件....');
  next();
}
