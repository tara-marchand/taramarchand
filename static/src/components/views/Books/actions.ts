import { Book, SET_BOOKS, BooksActionTypes } from './types';

export function setBooks(newBooks: Book[]): BooksActionTypes {
  return {
    type: SET_BOOKS,
    payload: newBooks
  };
}
