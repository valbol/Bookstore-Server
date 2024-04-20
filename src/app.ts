import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoDb from './db';
import routes from './routes';
import logger from './logger';
import initializeRedisClient from './middleware/cacheMiddleware';
import logErrorMiddleware from './middleware/logErrorsMiddleware';

const createApp = async () => {
  const app: Application = express();

  // TODO: delete all console.log statements
  console.log('Loaded environment variables:', process.env);

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
  app.use(logErrorMiddleware);
  await mongoDb();
  await initializeRedisClient();

  routes(app);

  return app;
};

export default createApp;
