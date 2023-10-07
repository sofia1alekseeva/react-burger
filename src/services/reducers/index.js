import { combineReducers } from 'redux';
import ingredientsSlice from './ingredients';
import ingredientDetailsSlice from './ingredient-details';
import orderDetailsSlice from './order-details';
import burgerConstructorSlice from './burger-constructor';
import { loginSlice, logoutSlice, registerSlice } from './auth';
import profileSlice from './profile';
import forgotPasswordSlice from "./profile/forgot-password"
import resetPasswordSlice from "./profile/reset-password"

export const rootReducer = combineReducers({ 
    ingredientsSlice, 
    ingredientDetailsSlice, 
    orderDetailsSlice, 
    burgerConstructorSlice, 
    loginSlice,
    logoutSlice,
    registerSlice,
    profileSlice,
    forgotPasswordSlice,
    resetPasswordSlice
 });