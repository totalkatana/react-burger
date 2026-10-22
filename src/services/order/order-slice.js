import { createSlice } from '@reduxjs/toolkit';

import { submitOrder } from './order-actions';

const initialState = {
  number: null,
  status: 'idle',
  error: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: () => initialState,
  },
  selectors: {
    selectOrder: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.number = null;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.number = action.payload;
        state.status = 'succeeded';
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
export const { selectOrder } = orderSlice.selectors;
