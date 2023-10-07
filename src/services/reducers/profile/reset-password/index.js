import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendResetPasswordData } from "../../../../utils/burger-api";


const initialState = {
  loading: null,
  error: null
}

export const resetPasswordThunk = createAsyncThunk(
  'profile/resetPassword',
  async (data) => await sendResetPasswordData(data),
);



const resetPasswordSlice = createSlice({
  name: 'profile/resetPassword',
  initialState: initialState,
  reducers: {
    clearResetPasswordError: (state) => {
      state.error = undefined;
    },
  },

  extraReducers: (builder) => {

    builder.addCase(resetPasswordThunk.pending, (state) => {
      state.loading = 'pending';
      state.error = initialState.error;;
    });
    builder.addCase(resetPasswordThunk.fulfilled, (state) => {
      state.error = initialState.error;
      state.loading = 'succeeded';
    });
    builder.addCase(resetPasswordThunk.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message;
    });
  },
});

export const { clearResetPasswordError } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;