import { RootState } from "../..";

export const ordersFeedDataSelector = (state: RootState) =>
  state.ordersFeedSlice.ordersFeedData;
