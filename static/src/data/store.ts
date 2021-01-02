import { configureStore } from '@reduxjs/toolkit';

import books from '../components/Books/reducer';
import { jobsSlice } from '../components/JobHunt/slice';

const { reducer: jobs } = jobsSlice;

export default configureStore({
  reducer: {
    books,
    jobs,
  },
});
