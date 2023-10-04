import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { sendLoginData, sendLogoutData, sendRegistrationData, updateTokenData } from "../../../utils/burger-api"


const initialState = {
    error: "",
    loading: ""
}

export const registerThunk = createAsyncThunk("auth/register", async (userData) =>
    await sendRegistrationData(userData)
);

export const loginThunk = createAsyncThunk("auth/login", async (loginData) => await sendLoginData(loginData));

export const updateTokenThunk = createAsyncThunk("auth/token", async () => await updateTokenData());

export const logoutThunk = createAsyncThunk("auth/logout", async () => await sendLogoutData());


const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        clearAuthError: (state) => {
            state.error = undefined;
          },
    },
    extraReducers: (builder) => {
        builder.addCase(registerThunk.pending, (state) => {
            state.loading = 'pending';
            state.error = undefined;
        });
        builder.addCase(registerThunk.fulfilled, (state, action) => {
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            localStorage.setItem('accessToken', action.payload.accessToken);
            state.loading = 'succeeded';
        });
        builder.addCase(registerThunk.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
        builder.addCase(loginThunk.pending, (state) => {
            state.loading = 'pending';
            state.error = undefined;
        });
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            localStorage.setItem('accessToken', action.payload.accessToken);
            // console.log("action.payload", action.payload)
            // state.login = action.payload.email;
            // state.password = action.payload.password;
            state.loading = 'succeeded';
        });
        builder.addCase(loginThunk.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });

        builder.addCase(updateTokenThunk.pending, (state) => {
            state.loading = 'pending';
            state.error = undefined;
        });
        builder.addCase(updateTokenThunk.fulfilled, (state, action) => {
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            localStorage.setItem('accessToken', action.payload.accessToken);
            state.loading = 'succeeded';
        });
        builder.addCase(updateTokenThunk.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });

        builder.addCase(logoutThunk.pending, (state) => {
            state.loading = 'pending';
            state.error = undefined;
        });
        builder.addCase(logoutThunk.fulfilled, (state, action) => {
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            state.loading = 'succeeded';
        });
        builder.addCase(logoutThunk.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
    },
})

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;