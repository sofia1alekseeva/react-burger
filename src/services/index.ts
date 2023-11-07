import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { TWsActions, socketMiddleware } from "./middleware/socket-middleware";
import {
  setOrdersData,
  wsOrdersClose,
  wsOrdersError,
  wsOrdersInit,
} from "./reducers/orders-feed";

const wsActions: TWsActions = {
  wsInit: wsOrdersInit,
  onClose: wsOrdersClose,
  onError: wsOrdersError,
  onMessage: setOrdersData,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([socketMiddleware(wsActions)]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
