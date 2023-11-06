import { RootState } from "../..";

export const orderFeedDetails = (state: RootState) =>
  state.orderFeedDetailsSlice.orderFeedDetails;
export const loading = (state: RootState) =>
  state.orderFeedDetailsSlice.loading;
export const error = (state: RootState) => state.orderFeedDetailsSlice.error;
