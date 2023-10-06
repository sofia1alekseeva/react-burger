import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateTokenData } from "../../../../utils/burger-api";

const initialState = {
    error: "",
    loading: ""
}

export const updateTokenThunk = createAsyncThunk("auth/token", async () => await updateTokenData());


const updateTokenSlice = createSlice({
    name: "auth/token",
    initialState: initialState,
    reducers: {
        clearUpdateTokenError: (state) => {
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
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

    },
})

export const { clearUpdateTokenError } = updateTokenSlice.actions;
export default updateTokenSlice.reducer;