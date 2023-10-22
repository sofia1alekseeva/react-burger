import { RootState } from "../../..";

export const loading = (state: RootState) => state.resetPasswordSlice.loading;
export const error = (state: RootState) => state.resetPasswordSlice.error;
