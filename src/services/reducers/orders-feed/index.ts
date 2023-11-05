import { createSlice } from "@reduxjs/toolkit";
import { TOrderFeed, TOrdersFeed } from "../../../interfaces/IOrderFeed";

export interface IInitialState {
  ordersFeedData: TOrdersFeed | null;
  orderFeedDetails: TOrderFeed | null;
  isSocket: boolean;
  socketUrl: string;
  error?: string;
}

const initialState: IInitialState = {
  ordersFeedData: null,
  orderFeedDetails: null,
  isSocket: false,
  socketUrl: "",
  error: undefined,
};

const ordersFeedSlice = createSlice({
  name: "ordersFeed",
  initialState: initialState,
  reducers: {
    wsInit: (state, action) => {
      state.socketUrl = action.payload;
    },
    wsClose: (state) => {
      state.isSocket = false;
      state.ordersFeedData = null;
    },
    wsOpen: (state) => {
      state.isSocket = true;
    },
    clearOrdersError: (state) => {
      state.error = undefined;
    },
    setOrdersData: (state, action) => {
      state.ordersFeedData = {
        ...action.payload,
        orders: action.payload?.orders?.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
      };
    },
    setOrderFeedDetails: (state, action) => {
      state.orderFeedDetails = action.payload?.data.orders[0];
    },
    clearOrdersData: (state) => {
      state.ordersFeedData = null;
    },
  },
});

export const {
  clearOrdersError,
  setOrdersData,
  setOrderFeedDetails,
  clearOrdersData,
  wsInit,
  wsClose,
} = ordersFeedSlice.actions;

export default ordersFeedSlice.reducer;
