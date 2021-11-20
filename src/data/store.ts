import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { booksReducer } from '../components_archive/Books/reducer';

const rootReducer = combineReducers({
  books: booksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer,
});
