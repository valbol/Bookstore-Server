import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

const logErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    const { message, stack } = err;
    const { ip, headers, method } = req;
    logger.error({
      message,
      stack,
      ip,
      headers,
      method,
    });
  }
  next(err);
};
export default logErrorMiddleware;
