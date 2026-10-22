import { createAsyncThunk } from '@reduxjs/toolkit';

import { createOrder } from '@utils/api';

export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async (ingredients, { rejectWithValue }) => {
    try {
      return await createOrder(ingredients);
    } catch (error) {
      return rejectWithValue(error.message || 'Не удалось оформить заказ');
    }
  },
  {
    condition: (_, { getState }) => getState().order.status !== 'loading',
  }
);
