import { RootState } from "../..";

export const ordersFeedDataSelector = (state: RootState) =>
  state.ordersFeedSlice.ordersFeedData;

  export const orderFeedDetailsSelector = (state: RootState) =>
  state.ordersFeedSlice.orderFeedDetails;
