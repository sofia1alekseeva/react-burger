import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendRegistrationData } from "../../../../utils/api";

type TInitialState = {
  error?: string;
  loading?: string;
};

const initialState: TInitialState = {
  error: "",
  loading: "",
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  sendRegistrationData
);

const registerSlice = createSlice({
  name: "auth/register",
  initialState: initialState,
  reducers: {
    clearRegisterError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerThunk.pending, (state) => {
      state.loading = "pending";
      state.error = undefined;
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      action.payload.data.refreshToken &&
        localStorage.setItem("refreshToken", action.payload.data.refreshToken);
      action.payload.data.accessToken &&
        localStorage.setItem("accessToken", action.payload.data.accessToken);
      state.loading = "succeeded";
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });
  },
});

export const { clearRegisterError } = registerSlice.actions;
export default registerSlice.reducer;
