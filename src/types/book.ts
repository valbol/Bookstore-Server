import { Document } from 'mongoose';

export enum Genre {
  ScienceFiction = 'ScienceFiction',
  Satire = 'Satire',
  Drama = 'Drama',
  Action = 'Action',
  Romance = 'Romance',
  Mystery = 'Mystery',
  Horror = 'Horror',
}

export interface IBook extends Document {
  title: string;
  idNumber: number;
  description: string;
  author: string;
  publicationDate: Date;
  genre: Genre;
  price: number;
}
