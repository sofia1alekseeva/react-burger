import { combineReducers } from 'redux';
import ingredientsSlice from './ingredients';
import ingredientDetailsSlice from './ingredient-details';
import orderDetailsSlice from './order-details';
import burgerConstructorSlice from './burger-constructor';
import authSlice from './auth';
import profileSlice from './profile';

export const rootReducer = combineReducers({ ingredientsSlice, ingredientDetailsSlice, orderDetailsSlice, burgerConstructorSlice, authSlice, profileSlice });