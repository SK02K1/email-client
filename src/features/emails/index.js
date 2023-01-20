import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  list: null,
  favorites: JSON.parse(localStorage.getItem('favorite-mails')) ?? [],
  readMails: JSON.parse(localStorage.getItem('read-mails')) ?? [],
  total: null,
  error: null,
  status: 'idle',
  selectedFilter: 'All',
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
  reducers: {
    markAsFavorite: (state, { payload }) => {
      const { mailId } = payload;
      const favorites = state.favorites.concat(mailId);
      localStorage.setItem('favorite-mails', JSON.stringify(favorites));
      state.favorites = favorites;
    },
    removeFromFavorites: (state, { payload }) => {
      const { mailId } = payload;
      const favorites = state.favorites.filter((id) => id !== mailId);
      localStorage.setItem('favorite-mails', JSON.stringify(favorites));
      state.favorites = favorites;
    },
    markAsRead: (state, { payload }) => {
      const { mailId } = payload;
      let readMails = state.readMails.concat(mailId);
      localStorage.setItem('read-mails', JSON.stringify(readMails));
      state.readMails = readMails;
    },
    changeSelectedFilter: (state, { payload }) => {
      state.selectedFilter = payload.filter;
    },
  },
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

export const {
  removeFromFavorites,
  changeSelectedFilter,
  markAsFavorite,
  markAsRead,
} = emailsSlice.actions;

export const emailsReducer = emailsSlice.reducer;
