import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.DEV,
  // Redux Toolkit's default middleware includes thunk for asynchronous actions.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
