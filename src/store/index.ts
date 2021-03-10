import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import drawReducer from './draw';

export const store = configureStore({
  reducer: {
    draw: drawReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
