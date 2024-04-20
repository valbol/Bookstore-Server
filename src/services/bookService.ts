import { Book } from '../models';
import { IBook } from '../types/book';

export const getAllBooks = async () => await Book.find();

export const getBook = async (id: string) => await Book.findOne({ idNumber: id });

export const addBook = async (newBook: IBook) => {
  const bookToCreate = { ...newBook, publicationData: new Date(newBook.publicationDate) };

  return await Book.create(bookToCreate);
};

export const deleteBook = async (id: string) => await Book.findOneAndDelete({ idNumber: id });
