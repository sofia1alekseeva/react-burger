import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IRegistrationData,
  getUserData,
  updateUserData,
} from "../../../utils/api/auth";
import { IUser } from "../../../interfaces/IUser";
import { IResponseUser } from "../../../interfaces/IResponseUser";

type TInitialState = {
  user: null | IUser;
  loading: string;
  error?: string;
};

export const initialState: TInitialState = {
  user: null,
  loading: "",
  error: undefined,
};

export const getUserThunk = createAsyncThunk("profile/getUser", async () => {
  const { data } = await getUserData();
  return data;
});

export const updateUserThunk = createAsyncThunk(
  "profile/updateUser",
  async (userData: IRegistrationData) => {
    const { data } = await updateUserData(userData);
    return data;
  }
);

const profileSlice = createSlice({
  name: "profile",
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
      state.loading = "pending";
      state.error = undefined;
    });
    builder.addCase(
      getUserThunk.fulfilled,
      (state, action: PayloadAction<IResponseUser>) => {
        state.user = action.payload.user;
        state.loading = "succeeded";
      }
    );
    builder.addCase(getUserThunk.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });

    builder.addCase(updateUserThunk.pending, (state) => {
      state.loading = "pending";
      state.error = undefined;
    });
    builder.addCase(
      updateUserThunk.fulfilled,
      (state, action: PayloadAction<IResponseUser>) => {
        state.user = action.payload.user;
        state.loading = "succeeded";
      }
    );
    builder.addCase(updateUserThunk.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });
  },
});

export const { clearProfileError, resetUser } = profileSlice.actions;

export default profileSlice.reducer;
