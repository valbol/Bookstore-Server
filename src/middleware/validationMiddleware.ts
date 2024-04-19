import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const bookSchema = Joi.object({
  bookName: Joi.string().required(),
  bookHeader: Joi.string().required(),
  publishYear: Joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
});

export const validateBookInput = (req: Request, res: Response, next: NextFunction) => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};
