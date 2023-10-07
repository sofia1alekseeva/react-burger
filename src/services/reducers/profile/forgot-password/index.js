import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendForgotPasswordData } from "../../../../utils/api";

const initialState = {
    loading: null,
    error: null
}

export const forgotPasswordThunk = createAsyncThunk(
    'profile/forgotPassword',
    sendForgotPasswordData
);


const forgotPasswordSlice = createSlice({
    name: 'profile/forgotPassword',
    initialState: initialState,
    reducers: {
        clearForgotPasswordError: (state) => {
            state.error = undefined;
        },
    },

    extraReducers: (builder) => {

        builder.addCase(forgotPasswordThunk.pending, (state) => {
            state.loading = 'pending';
            state.error = initialState.error;
        });
        builder.addCase(forgotPasswordThunk.fulfilled, (state) => {
            state.error = initialState.error;
            state.loading = 'succeeded';
        });
        builder.addCase(forgotPasswordThunk.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
    },
});

export const { clearForgotPasswordError } = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;