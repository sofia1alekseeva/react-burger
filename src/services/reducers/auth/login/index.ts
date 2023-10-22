import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendLoginData } from "../../../../utils/api";

type TInitialState = {
  error?: string;
  loading?: string;
};

const initialState: TInitialState = {
  error: "",
  loading: "",
};

export const loginThunk = createAsyncThunk("auth/login", sendLoginData);

const loginSlice = createSlice({
  name: "auth/login",
  initialState: initialState,
  reducers: {
    clearLoginError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = "pending";
      state.error = undefined;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      action.payload.data.refreshToken &&
        localStorage.setItem("refreshToken", action.payload.data.refreshToken);
      action.payload.data.accessToken &&
        localStorage.setItem("accessToken", action.payload.data.accessToken);
      state.loading = "succeeded";
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });
  },
});

export const { clearLoginError } = loginSlice.actions;
export default loginSlice.reducer;
