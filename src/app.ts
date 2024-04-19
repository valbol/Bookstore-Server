import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import logger from './logger';

const createApp = () => {
  const app: Application = express();

  const getCorsAllowedOrigins = () => {
    if (process.env.CLIENT_ALLOWED_ORIGINS) {
      const origins = process.env.CLIENT_ALLOWED_ORIGINS.split(',').map((item) => item.trim());
      return [new RegExp(process.env.CLIENT_ALLOWED_ORIGIN_REGEX), ...origins];
    }
    return [new RegExp(process.env.CLIENT_ALLOWED_ORIGIN_REGEX)];
  };

  const corsOptions = {
    origin: getCorsAllowedOrigins(),
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ limit: '5mb', extended: true }));

  // Middleware for logging errors
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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
  });

  // TODO add db...mongoose
  // if (!AppDataSource.isInitialized) {
  //   AppDataSource.initialize()
  //     .then(() => {
  //       logger.info(`DB connection initialized on port:${Number(process.env.DB_PORT) || 3306}`);
  //     })
  //     .catch((error: Error) => sendError(`DB connection initialization error: ${error}`));
  // }

  routes(app);

  return app;
};

export default createApp;
