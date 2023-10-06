import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendRegistrationData } from "../../../../utils/burger-api";

const initialState = {
    error: "",
    loading: ""
}

export const registerThunk = createAsyncThunk("auth/register", async (userData) =>
    await sendRegistrationData(userData)
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
    },
})

export const { clearRegisterError } = registerSlice.actions;
export default registerSlice.reducer;