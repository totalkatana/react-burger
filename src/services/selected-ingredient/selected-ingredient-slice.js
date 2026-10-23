import { createSlice } from '@reduxjs/toolkit';

export const selectedIngredientSlice = createSlice({
  name: 'selectedIngredient',
  initialState: {
    ingredient: null,
  },
  selectors: {
    selectViewedIngredient: (state) => state.ingredient,
  },
  reducers: {
    selectIngredient: (state, action) => {
      state.ingredient = action.payload;
    },
    clearSelectedIngredient: (state) => {
      state.ingredient = null;
    },
  },
});

export const { selectIngredient, clearSelectedIngredient } =
  selectedIngredientSlice.actions;
export const selectedIngredientReducer = selectedIngredientSlice.reducer;
export const { selectViewedIngredient } = selectedIngredientSlice.selectors;
