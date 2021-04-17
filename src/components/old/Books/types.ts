import { BookProps } from './Book';

export const SET_BOOKS = 'SET_BOOKS';

export interface SetBooksActionType {
  type: typeof SET_BOOKS;
  payload: BookProps[];
}

export type BooksActionTypes = SetBooksActionType;
