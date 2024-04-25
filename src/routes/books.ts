import express, { Request, Response } from 'express';
import { validateBookInput } from '../middleware/validationMiddleware';
import { cacheMiddleware, clearCacheByKey } from '../middleware/cacheMiddleware';
import { bookService } from '../services';

const router = express.Router();

router.get('/', cacheMiddleware, async (req: Request, res: Response) => {
  try {
    const result = await bookService.getAllBooks();

    if (!result) {
      res.status(404).json({ success: false, error: 'Book not found' });
      return;
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.get('/:id', cacheMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await bookService.getBook(Number(id));

    if (!result) {
      res.status(404).json({ success: false, error: 'Book not found' });
      return;
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

router.post('/', validateBookInput, clearCacheByKey, async (req: Request, res: Response) => {
  try {
    const newBook = req.body;
    const resp = await bookService.addBook(newBook);
    res.status(201).json({ success: true, message: 'Book added successfully', data: newBook });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

router.delete('/:id', clearCacheByKey, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await bookService.deleteBook(Number(id));
    if (!result) {
      res.status(404).json({ success: false, error: new Error('Book not found') });
      return;
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

export default router;
