import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getLaunches = createAsyncThunk('launches/getLaunches', async () => {
  return fetch('https://api.spacexdata.com/v3/launches').then((res) => res.json());
});

const launchesSlice = createSlice({
  name: 'launches',
  initialState: {
    list: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLaunches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getLaunches.fulfilled, (state, action) => {
        state.status = 'success';
        state.list += action.payload;
      })
      .addCase(getLaunches.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default launchesSlice.reducer;
