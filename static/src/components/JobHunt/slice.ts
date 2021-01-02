import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Job } from './JobSection';
import { getData } from '../../data/utils';

const initialState = { entities: [] } as JobList;

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

export const fetchJobsAirtable = createAsyncThunk(
  'jobs/fetchFromAirtable',
  async (thunkAPI: object) => {
    const fetchController: AbortController = new AbortController();
    const response = await getData('/api/jobs-airtable', fetchController);

    if (response instanceof Response) {
      return response.json();
    }
  }
);

export const jobs = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    createJob(state, action) {
      state.entities.push(action.payload);
    },
  },
  extraReducers: {
    [fetchJobs.fulfilled]: (state, action) => {
      state.entities = action.payload;
    },
    [fetchJobsAirtable.fulfilled]: (state, action) => {
      state.entities = action.payload.map((job: any) => {
        return {
          company: job.fields.Company,
          dateApplied: job.fields['Applied Date'],
          title: job.fields.Role,
          url: job.fields.Link,
        } as Job;
      });
    },
  },
});
