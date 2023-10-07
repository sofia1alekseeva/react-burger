import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendLoginData } from "../../../../utils/api";

const initialState = {
    error: "",
    loading: ""
}

export const loginThunk = createAsyncThunk("auth/login", async (loginData) => await sendLoginData(loginData));


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
            state.loading = 'pending';
            state.error = undefined;
        });
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            localStorage.setItem('accessToken', action.payload.accessToken);
            state.loading = 'succeeded';
        });
        builder.addCase(loginThunk.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
    },
})

export const { clearLoginError } = loginSlice.actions;
export default loginSlice.reducer;