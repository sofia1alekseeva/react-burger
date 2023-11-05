import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middleware/socketMiddleware";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([socketMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type StoreState = typeof store;
export type AppDispatch = typeof store.dispatch;
