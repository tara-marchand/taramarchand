import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Job } from './Job';
import { getData } from '../../data/utils';

interface JobsState {
  jobs: Job[];
}

const initialState = { jobs: [] } as JobsState;

const fetchJobs = createAsyncThunk('jobs', async (thunkAPI: object) => {
  const fetchController: AbortController = new AbortController();
  const dataPromise = getData('/api/jobs', fetchController);

  if (dataPromise) {
    dataPromise
      .then((response: any) => {
        if (response) {
          return response.json();
        }
      })
      .catch((error) => console.error(error));
  }
});

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    createJob(state, action) {
      state.jobs.push(action.payload);
    },
    setJobs(state, action) {
      state.jobs = action.payload;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchJobs.fulfilled]: (state, action) => {
      // Add user to the state array
      state.jobs.push(action.payload);
    },
  },
});
