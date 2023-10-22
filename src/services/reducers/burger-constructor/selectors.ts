import { RootState } from "../..";

export const bun = (state: RootState) => state.burgerConstructorSlice.bun;
export const main = (state: RootState) => state.burgerConstructorSlice.main;
export const sum = (state: RootState) => state.burgerConstructorSlice.sum;
