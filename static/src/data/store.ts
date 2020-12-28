import { configureStore } from '@reduxjs/toolkit';

import books from '../components/Books/reducer';
import { jobsSlice } from '../components/JobHunt/slice';

const { reducer: jobsReducer } = jobsSlice;

export default configureStore({
  reducer: {
    books,
    jobsReducer,
  },
});
