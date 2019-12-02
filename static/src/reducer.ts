import { combineReducers } from 'redux';

import books from './components/views/Books/reducer';
import { BooksState } from './components/views/Books/types';

export interface AppState {
  books: BooksState;
}

export default combineReducers({
  books
});
