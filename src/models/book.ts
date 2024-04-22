import mongoose, { Schema } from 'mongoose';
import { IBook, Genre } from '../types/book';

const BookSchema = new Schema({
  title: { type: String, required: true },
  idNumber: { type: String, unique:true, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  publicationData: { type: Date, required: true },
  genre: { type: String, enum: Genre, required: true },
  price: { type: Number, required: true },
});

BookSchema.index({idNumber: 1})
BookSchema.index({author: 1, genre: 1})

export default mongoose.model<IBook>('Book', BookSchema);
