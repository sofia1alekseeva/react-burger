import { combineReducers } from 'redux';
import ingredientsSlice from './ingredients';
import ingredientDetailsSlice from './ingredient-details';
import orderDetailsSlice from './orderDetails';
import burgerConstructorSlice from './burger-constructor';

export const rootReducer = combineReducers({ ingredientsSlice, ingredientDetailsSlice, orderDetailsSlice, burgerConstructorSlice });