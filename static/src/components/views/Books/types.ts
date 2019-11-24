export interface BooksState {
  books: Book[];
}

export interface Book {
  authors: string;
  id?: number;
  title: string;
}

export const SET_BOOKS = 'SET_BOOKS';

interface SetBooksAction {
  type: typeof SET_BOOKS;
  payload: Book[];
}

export type BooksActionTypes = SetBooksAction;
