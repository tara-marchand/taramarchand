import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { booksReducer } from '../components/Books/reducer';
import { jobs } from '../components/JobHunt/slice';

const rootReducer = combineReducers({
  books: booksReducer,
  jobs: jobs.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer,
});
