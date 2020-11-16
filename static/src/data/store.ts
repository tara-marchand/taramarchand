import { configureStore } from '@reduxjs/toolkit';

import books from '../components/Books/reducer';

const rootReducer = {
  books,
};

export default configureStore({ reducer: rootReducer });
