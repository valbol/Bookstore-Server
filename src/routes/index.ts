import { Application } from 'express';
import healthRouter from './health';
import BooksRouter from './books';

const routes = (app: Application) => {
  app.use('/health', healthRouter);
  app.use('/books', BooksRouter);
};

export default routes;
