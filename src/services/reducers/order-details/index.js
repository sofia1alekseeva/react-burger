import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendOrderIngredients } from '../../../utils/api';

const initialState = {
    orderDetails: {
        name: "",
        order: {
            number: 0
        },
        success: false
    },
    loading: 'idle',
    error: null
}

export const sendOrderDetailsThunk = createAsyncThunk('orderDetails', sendOrderIngredients);

export const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(sendOrderDetailsThunk.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(sendOrderDetailsThunk.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error
            })
            .addCase(sendOrderDetailsThunk.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.orderDetails = action.payload;
                state.error = initialState.error;

            })
    }
})

export default orderDetailsSlice.reducer;