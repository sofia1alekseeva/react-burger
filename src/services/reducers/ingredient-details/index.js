import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ingredientDetails: {
        "_id": "",
        "name": "",
        "type": "",
        "proteins": 0,
        "fat": 0,
        "carbohydrates": 0,
        "calories": 0,
        "price": 0,
        "image": "",
        "image_mobile": "",
        "image_large": "",
        "__v": 0
    }
}

export const ingredientDetailsSlice = createSlice({
    name: 'ingredientDetails',
    initialState,
    reducers: {
        setIngredientDetails: (state, action) => {
            state.ingredientDetails = action.payload
        },
        resetIngredientDetails: (state) => {
            state.ingredientDetails = initialState.ingredientDetails
        }
        
    }
})

export const { setIngredientDetails, resetIngredientDetails } = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;