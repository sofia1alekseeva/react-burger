import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserData, updateUserData } from "../../../utils/api/auth";

const initialState = {
  user: null,
  loading: "",
  error: ""
}

export const getUserThunk = createAsyncThunk(
  'profile/getUser',
  async () => await getUserData()
);

export const updateUserThunk = createAsyncThunk(
  'profile/updateUser',
  async (userData) => await updateUserData(userData)
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
  },
});

export const { clearProfileError, resetUser } = profileSlice.actions;

export default profileSlice.reducer;