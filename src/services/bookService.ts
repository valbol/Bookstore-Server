import { Book } from '../models';
import { IBook } from '../types/book';

export const getAllBooks = async () => await Book.find().select('-_id');

export const getBook = async (id: string) => await Book.findOne({ idNumber: id }).select('-_id');

export const addBook = async (newBook: IBook) => {
  const bookToCreate = { ...newBook, publicationData: new Date(newBook.publicationDate) };

  return await Book.create(bookToCreate);
};

export const deleteBook = async (id: string) => await Book.findOneAndDelete({ idNumber: id }).select('-_id');
