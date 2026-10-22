import { createSlice } from '@reduxjs/toolkit';

import { fetchIngredients } from './ingredients-actions';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.items,
    selectIngredientsState: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? action.error.message;
      });
  },
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { selectIngredients, selectIngredientsState } = ingredientsSlice.selectors;
