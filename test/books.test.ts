import { expect } from 'chai';
import { bookService } from '../src/services';
import { IBook, Genre } from '../src/types/book';
import mongoose from 'mongoose';

describe('Book Service', () => {
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/test');
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe('addBook', () => {
    it('should add a new book', async () => {
      const newBook = {
        title: 'Test Book',
        idNumber: 123,
        description: 'This is a test book',
        author: 'Test Author',
        publicationDate: new Date(),
        genre: Genre.Action,
        price: 10.99,
      } as IBook;

      const addedBook = await bookService.addBook(newBook);
      expect(addedBook).to.exist;
      expect(addedBook.title).to.equal(newBook.title);
      expect(addedBook.genre).to.equal(newBook.genre);
  
    });
  });

  describe('getAllBooks', () => {
    it('should return an array of books', async () => {
      const books = await bookService.getAllBooks();
      expect(books).to.be.an('array');
 
    });
  });

  describe('getBook', () => {
    it('should return a specific book', async () => {
      const id = 123; 
      const book = await bookService.getBook(id);
      expect(book).to.exist;
      expect(book.idNumber).to.equal(id.toString());
 
    });
  });

  describe('deleteBook', () => {
    it('should delete a specific book', async () => {
      const id = 123;  
      const deletedBook = await bookService.deleteBook(id);
      expect(deletedBook).to.exist;
      expect(deletedBook.idNumber).to.equal(id.toString());
 
    });
  });
});
