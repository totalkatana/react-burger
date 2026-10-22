import { combineSlices } from '@reduxjs/toolkit';

import { burgerConstructorSlice } from './burger-constructor/burger-constructor-slice';
import { ingredientsSlice } from './ingredients/ingredients-slice';
import { orderSlice } from './order/order-slice';
import { selectedIngredientSlice } from './selected-ingredient/selected-ingredient-slice';

export const rootReducer = combineSlices(
  burgerConstructorSlice,
  ingredientsSlice,
  orderSlice,
  selectedIngredientSlice
);
