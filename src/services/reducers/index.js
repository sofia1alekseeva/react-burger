import { combineReducers } from 'redux';
import ingredientsSlice from './ingredients';
import ingredientDetailsSlice from './ingredient-details';
import orderDetailsSlice from './order-details';
import burgerConstructorSlice from './burger-constructor';
import { loginSlice, logoutSlice, registerSlice, updateTokenSlice } from './auth';
import profileSlice from './profile';

export const rootReducer = combineReducers({ 
    ingredientsSlice, 
    ingredientDetailsSlice, 
    orderDetailsSlice, 
    burgerConstructorSlice, 
    loginSlice,
    logoutSlice,
    registerSlice,
    updateTokenSlice,
    profileSlice });