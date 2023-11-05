import type { Middleware } from "redux";
import type { StoreState } from "../index";
import {
  clearOrdersData,
  setOrdersData,
  wsClose,
  wsInit,
} from "../reducers/orders-feed";

export const socketMiddleware = (() => {
  return (store: StoreState) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      if (type === wsInit.type) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        if (type === wsClose.type) {
          socket.close();
          dispatch(clearOrdersData());
        }

        socket.onmessage = (event) => {
          const { data } = event;
          const parseData = JSON.parse(data);
          dispatch(setOrdersData(parseData));
        };

        socket.onclose = () => {
          dispatch(clearOrdersData());
        };
      }

      next(action);
    };
  };
})() as Middleware;
