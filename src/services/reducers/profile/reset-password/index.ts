import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendResetPasswordData } from "../../../../utils/api";

type TInitialState = {
  loading?: string;
  error?: string;
};

const initialState: TInitialState = {
  loading: "",
  error: "",
};

export const resetPasswordThunk = createAsyncThunk(
  "profile/resetPassword",
  sendResetPasswordData
);

const resetPasswordSlice = createSlice({
  name: "profile/resetPassword",
  initialState: initialState,
  reducers: {
    clearResetPasswordError: (state) => {
      state.error = undefined;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(resetPasswordThunk.pending, (state) => {
      state.loading = "pending";
      state.error = initialState.error;
    });
    builder.addCase(resetPasswordThunk.fulfilled, (state) => {
      state.error = initialState.error;
      state.loading = "succeeded";
    });
    builder.addCase(resetPasswordThunk.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });
  },
});

export const { clearResetPasswordError } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
