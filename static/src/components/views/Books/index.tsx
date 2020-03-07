import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../../utils';
import Book, { BookProps } from './Book';
import { SET_BOOKS } from './types';

interface State {
  books: BookProps[];
}

export default function Books() {
  const fetchController: AbortController = new AbortController();
  const dispatch = useDispatch();
  const books = useSelector((state: State) => state.books);

  useEffect(() => console.log('mounted or updated'), [books]);

  useEffect(() => {
    return () => {
      console.log('will unmount');
      fetchController.abort();
    };
  }, []);

  useEffect(() => {
    getData('/api/books', fetchController)
      .then((response: Response) => {
        return response.json();
      })
      .then(books => {
        dispatch({ payload: books, type: SET_BOOKS });
      })
      .catch(error => console.error(error));
  }, [!books]);

  return (
    <div>
      {books.length > 0 &&
        books.map(book => (
          <Book title={book.title} authors={book.authors} key={book.id} />
        ))}
    </div>
  );
}
