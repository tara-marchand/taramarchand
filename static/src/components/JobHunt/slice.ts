import { createSlice } from '@reduxjs/toolkit';

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState: [],
  reducers: {
    createJob(state, action) {
      state.push(action.payload);
    },
    setJobs(state, action) {
      state = action.payload;
    },
  },
});
