import type { Middleware, MiddlewareAPI } from "redux";
import type { AppDispatch, RootState } from "../../services/index";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export type TWsActions = {
  wsInit: ActionCreatorWithPayload<any, string>;
  onClose: ActionCreatorWithPayload<any, string>;
  onError: ActionCreatorWithPayload<any, string>;
  onMessage: ActionCreatorWithPayload<any, string>;
};

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onClose, onError, onMessage } = wsActions;
      if (type === wsInit.type) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        if (type === onClose.type) {
          socket.close();
        }

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onclose = (event?) => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};
