import { createClient } from 'redis';
import logger from '../logger';
import hash from 'object-hash';
import { Request, Response, NextFunction } from 'express';

let redisClient = undefined;
const FIVE_HOURS_IN_SECONDS = 60 * 60 * 5;

const initializeRedisClient = async () => {
  const redisURL = 'redis://localhost:6379';

  redisClient = createClient({
    url: redisURL,
    socket: {
      reconnectStrategy: function (retries) {
        if (retries > 3) {
          logger.error('Too many attempts to reconnect. Redis connection was terminated');
          return new Error('Redis locally NOT CONNECTED');
        } else {
          return retries * 500;
        }
      },
    },
  }).on('error', (err) => {
    logger.error(`Redis client error: ${err}`);
  });

  try {
    await redisClient.connect();
    logger.info(`Redis client running on ${redisURL}`);
  } catch (error) {
    logger.error(`Redis client error: ${error}`);
  }
};

const isRedisWorking = () => !!redisClient?.isOpen;

const writeDataToCache = async (key: string, data: any) => {
  if (isRedisWorking()) {
    try {
      await redisClient.set(key, JSON.stringify(data), 'EX', FIVE_HOURS_IN_SECONDS);
    } catch (error) {
      logger.error(`Error writing to cache: ${error} for key: ${key}`);
    }
  }
};

const readDataFromCache = async (key: string) => {
  if (isRedisWorking()) {
    try {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error(`Error reading from cache: ${error} for key: ${key}`);
    }
  }
  return null;
};

export const createRequestKey = (req: Request) => {
  const { query, path } = req;
  const requestToHash = {
    query,
    path,
  };

  return `${req.path}@${hash(requestToHash)}`;
};


export const cacheMiddleware = () => async (req: Request, res: Response, next: NextFunction) => {
  if (isRedisWorking()) {
    const key = createRequestKey(req);
    // Check if there is cached data
    const cachedValue = await readDataFromCache(key);
    if (cachedValue) {
      try {
        // If cached data is JSON, return it
        return res.json(JSON.parse(cachedValue));
      } catch {
        // If not JSON, return it
        return res.send(cachedValue);
      }
    } else {
      // Override res.send to introduce caching logic
      const oldSend = res.send;
      res.send = (data: any) => {
        // Restore original send function to avoid double-send
        res.send = oldSend;
        // Cache the response only if it is successful
        if (res.statusCode.toString().startsWith('2')) {
          writeDataToCache(key, data).then();
        }
        return res.send(data);
      };
      next();
    }
  } else {
    // No caching if Redis is not working
    next();
  }
};

export default initializeRedisClient;
