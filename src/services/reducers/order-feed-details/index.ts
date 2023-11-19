import { SerializedError, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrderFeed } from "../../../interfaces/IOrderFeed";
import { getOrderFeedDetails } from "../../../utils/api/orders";

export interface IInitialState {
  orderFeedDetails: TOrderFeed | null;
  error?: string;
  loading?: string;
}

export const initialState: IInitialState = {
  orderFeedDetails: null,
  error: undefined,
  loading: "",
};

export const getOrderFeedDetailsThunk = createAsyncThunk(
  "ordersFeedDetails",
  async (number:string) => {
    const { data } = (await getOrderFeedDetails(number)) || {};
    return data.orders[0];
}
);

const orderFeedDetailsSlice = createSlice({
  name: "ordersFeedDetails",
  initialState: initialState,
  reducers: {
    setOrderFeedDetails: (state, action) => {
      state.orderFeedDetails = action.payload?.data.orders[0];
    },
    clearOrderFeedDetailsData: (state) => {
      state.orderFeedDetails = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getOrderFeedDetailsThunk.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getOrderFeedDetailsThunk.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(getOrderFeedDetailsThunk.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.orderFeedDetails = action.payload;
        state.error = initialState.error;
      });
  },
});

export const { setOrderFeedDetails, clearOrderFeedDetailsData } =
  orderFeedDetailsSlice.actions;

export default orderFeedDetailsSlice.reducer;
