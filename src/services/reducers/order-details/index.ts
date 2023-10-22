import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { sendOrderIngredients } from "../../../utils/api";
import { IOrderDetails } from "../../../interfaces/IOrderDetails";

type TInitialState = {
  orderDetails: IOrderDetails;
  loading?: string;
  error?: string | SerializedError;
};

const initialState: TInitialState = {
  orderDetails: {
    name: "",
    order: {
      number: 0,
    },
    success: false,
  },
  loading: "idle",
  error: "",
};

export const sendOrderDetailsThunk = createAsyncThunk(
  "orderDetails",
  sendOrderIngredients
);

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(sendOrderDetailsThunk.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(sendOrderDetailsThunk.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error;
      })
      .addCase(sendOrderDetailsThunk.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.orderDetails = action.payload.data;
        state.error = initialState.error;
      });
  },
});

export default orderDetailsSlice.reducer;
