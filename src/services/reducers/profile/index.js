import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserData, sendForgotPasswordData, sendResetPasswordData, updateUserData } from "../../../utils/burger-api";


const initialState = {
    user: null,

}

export const getUserThunk = createAsyncThunk(
    'profile/getUser',
    async () => await getUserData()
  );
  
  export const updateUserThunk = createAsyncThunk(
    'profile/updateUser',
    async (userData) => await updateUserData(userData)
  );
  
  export const forgotPasswordThunk = createAsyncThunk(
    'profile/forgotPassword',
    async (data) => await sendForgotPasswordData(data),
  );
  
  export const resetPasswordThunk = createAsyncThunk(
    'profile/resetPassword',
    async (data) => await sendResetPasswordData(data),
  );


  const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
      clearProfileError: (state) => {
        state.error = undefined;
      },
      resetUser: (state) => {
        state.user = null;
      },
    },
  
    extraReducers: (builder) => {
      builder.addCase(getUserThunk.pending, (state) => {
        state.loading = 'pending';
        state.error = undefined;
      });
      builder.addCase(getUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = 'succeeded';
      });
      builder.addCase(getUserThunk.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
        console.log("action", action)
      });
  
      builder.addCase(updateUserThunk.pending, (state) => {
        state.loading = 'pending';
        state.error = undefined;
      });
      builder.addCase(updateUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = 'succeeded';
      });
      builder.addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  
      builder.addCase(forgotPasswordThunk.pending, (state) => {
        state.loading = 'pending';
        state.error = undefined;
      });
      builder.addCase(forgotPasswordThunk.fulfilled, (state) => {
        state.passwordIsSend = true;
        state.loading = 'succeeded';
      });
      builder.addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  
      builder.addCase(resetPasswordThunk.pending, (state) => {
        state.loading = 'pending';
        state.error = undefined;
      });
      builder.addCase(resetPasswordThunk.fulfilled, (state) => {
        state.passwordIsSend = false;
        state.loading = 'succeeded';
      });
      builder.addCase(resetPasswordThunk.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
    },
  });
  
  export const { clearProfileError, resetUser } = profileSlice.actions;

  export default profileSlice.reducer;