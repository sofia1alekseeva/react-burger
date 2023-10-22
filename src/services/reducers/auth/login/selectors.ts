import { RootState } from "../../..";

export const loading = (state:RootState) => state.loginSlice.loading;
export const error = (state:RootState) => state.loginSlice.error;