import { RootState } from "../..";

export const ingredients = (state: RootState) =>
  state.ingredientsSlice.ingredients;
export const loading = (state: RootState) => state.ingredientsSlice.loading;
export const error = (state: RootState) => state.ingredientsSlice.error;
