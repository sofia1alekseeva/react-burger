import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendLogoutData } from "../../../../utils/api";

type TInitialState = {
  error?: string;
  loading?: string;
};

export const initialState: TInitialState = {
  error: undefined,
  loading: "",
};

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async () => await sendLogoutData()
);

const logoutSlice = createSlice({
  name: "auth/logout",
  initialState: initialState,
  reducers: {
    clearLogoutError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutThunk.pending, (state) => {
      state.loading = "pending";
      state.error = undefined;
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      state.loading = "succeeded";
    });
    builder.addCase(logoutThunk.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });
  },
});

export const { clearLogoutError } = logoutSlice.actions;
export default logoutSlice.reducer;
