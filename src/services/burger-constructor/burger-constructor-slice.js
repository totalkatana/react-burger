import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    selectBurgerConstructor: (state) => state,
    selectTotalPrice: createSelector(
      [(state) => state.bun, (state) => state.ingredients],
      (bun, ingredients) =>
        ingredients.reduce(
          (total, ingredient) => total + ingredient.price,
          (bun?.price ?? 0) * 2
        )
    ),
    selectIngredientCounts: createSelector(
      [(state) => state.bun, (state) => state.ingredients],
      (bun, ingredients) => {
        const counts = {};

        ingredients.forEach((ingredient) => {
          counts[ingredient._id] = (counts[ingredient._id] ?? 0) + 1;
        });

        if (bun) {
          counts[bun._id] = 2;
        }

        return counts;
      }
    ),
  },
  reducers: {
    moveIngredient: (state, action) => {
      const { sourceId, targetId } = action.payload;
      const sourceIndex = state.ingredients.findIndex((item) => item.id === sourceId);
      const targetIndex = state.ingredients.findIndex((item) => item.id === targetId);

      if (sourceIndex === -1 || targetIndex === -1 || sourceIndex === targetIndex) {
        return;
      }

      const [ingredient] = state.ingredients.splice(sourceIndex, 1);
      state.ingredients.splice(targetIndex, 0, ingredient);
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    addIngredient: {
      prepare: (ingredient) => ({
        payload: { ...ingredient, id: nanoid() },
      }),
      reducer: (state, action) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
    },
    setConstructorIngredients: (state, action) => {
      state.bun = action.payload.bun;
      state.ingredients = action.payload.ingredients;
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  setConstructorIngredients,
} = burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const { selectBurgerConstructor, selectTotalPrice, selectIngredientCounts } =
  burgerConstructorSlice.selectors;
