import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendForgotPasswordData } from "../../../../utils/burger-api";


const initialState = {
    loading: null,
    error: null
}

export const forgotPasswordThunk = createAsyncThunk(
    'profile/forgotPassword',
    async (data) => await sendForgotPasswordData(data),
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
            state.error = undefined;
        });
        builder.addCase(forgotPasswordThunk.fulfilled, (state) => {
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