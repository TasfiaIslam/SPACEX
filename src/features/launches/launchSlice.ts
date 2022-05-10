import { RootState } from '@/app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getLaunches = createAsyncThunk('launches/getLaunches', async () => {
  return fetch('https://api.spacexdata.com/v3/launches').then((res) => res.json());
});

export const getLaunchesByRocket = createAsyncThunk(
  'launches/getLaunchesByRocket',
  async (term: string) => {
    return fetch(`https://api.spacexdata.com/v3/launches?&rocket_name=${term}`).then((res) =>
      res.json(),
    );
  },
);

const launchesSlice = createSlice({
  name: 'launches',
  initialState: {
    list: [],
    status: null,
    listByName: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLaunches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLaunches.fulfilled, (state, action) => {
        state.status = 'success';
        state.list = action.payload;
      })
      .addCase(getLaunches.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getLaunchesByRocket.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLaunchesByRocket.fulfilled, (state, action) => {
        state.status = 'success';
        state.listByName = action.payload;
      })
      .addCase(getLaunchesByRocket.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectLaunches = (state: RootState) => state.launches;

export default launchesSlice.reducer;
