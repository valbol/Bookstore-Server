import express, { Request, Response } from 'express';
import { validateBookInput } from '../middleware/validationMiddleware';
import { cacheMiddleware } from '../middleware/cacheMiddleware';

const router = express.Router();

router.get('/', cacheMiddleware, (req: Request, res: Response) => {
  res.send('books route works!');
});

router.get('/:id', cacheMiddleware, (req: Request, res: Response) => {
  console.log('Inside route handler');
  res.send({ 'books route works!': req.params.id });
});

router.post('/', validateBookInput, (req: Request, res: Response) => {
  const newBook = req.body;

  // TODO: logic to add book to database
  res.status(201).json({ success: true, message: 'Book added successfully', data: newBook });
});

router.delete('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  // TODO: logic to add delete to database
  res.status(204).send({ success: true, message: `Book ${id} deleted successfully` });
});

export default router;
