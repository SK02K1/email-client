import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  list: null,
  total: null,
  error: null,
  status: 'idle',
};

const name = 'emails';

export const getAllEmails = createAsyncThunk(
  'emails/getAllEmails',
  async (_, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.get(
        `https://flipkart-email-mock.now.sh/`
      );
      if (status === 200) {
        return { data };
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        error: {
          message: 'Failed to get all emails, try sometime later',
          errorMessage: error.message,
        },
      });
    }
  }
);

const emailsSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers(builder) {
    // GET ALL EMAILS
    builder.addCase(getAllEmails.pending, (state, { payload }) => {
      state.list = null;
      state.total = null;
      state.error = null;
      state.status = 'pending';
    });
    builder.addCase(getAllEmails.fulfilled, (state, { payload }) => {
      state.list = payload.data.list;
      state.total = payload.data.total;
      state.error = null;
      state.status = 'succeeded';
    });
    builder.addCase(getAllEmails.rejected, (state, { payload }) => {
      state.error = payload.error;
      state.status = 'failed';
    });
  },
});

export const emailsReducer = emailsSlice.reducer;
