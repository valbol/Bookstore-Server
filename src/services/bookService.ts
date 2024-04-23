import { Book } from '../models';
import { IBook } from '../types/book';
import { MongoServerError } from 'mongodb';

export const getAllBooks = async () => await Book.find().select('-_id');

export const getBook = async (id: number) => await Book.findOne({ idNumber: id }).select('-_id');

export const addBook = async (newBook: IBook) => {
  try {
    const bookToCreate = { ...newBook, publicationData: new Date(newBook.publicationDate) };

    return await Book.create(bookToCreate);
  } catch (error) {
    throw (error as MongoServerError).errmsg;
  }
};

export const deleteBook = async (id: number) => await Book.findOneAndDelete({ idNumber: id }).select('-_id');
