import { RootState } from "../../..";

export const loading = (state: RootState) => state.forgotPasswordSlice.loading;
export const error = (state: RootState) => state.forgotPasswordSlice.error;
