import { createAsyncThunk } from '@reduxjs/toolkit';

import { getIngredients } from '@utils/api';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getIngredients();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Не удалось загрузить ингредиенты');
    }
  },
  {
    condition: (_, { getState }) => getState().ingredients.status !== 'loading',
  }
);
