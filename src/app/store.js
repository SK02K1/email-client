import { configureStore } from '@reduxjs/toolkit';
import { emailsReducer } from '@src/features';

export const store = configureStore({
  reducer: {
    emails: emailsReducer,
  },
});
