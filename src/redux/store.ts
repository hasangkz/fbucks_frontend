import { configureStore } from '@reduxjs/toolkit';
import basketSlice from './features/BasketSlice';
import authSlice from './features/AuthSlice';

export const store = configureStore({
  reducer: {
    // @ts-ignore
    basket: basketSlice,
    auth: authSlice,
  },
});
