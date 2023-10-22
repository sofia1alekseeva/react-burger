import { RootState } from "../..";

export const orderDetails = (state: RootState) =>
  state.orderDetailsSlice.orderDetails;
export const loading = (state: RootState) => state.orderDetailsSlice.loading;
export const error = (state: RootState) => state.orderDetailsSlice.error;
