import { RootState } from "../../..";

export const loading = (state:RootState) => state.logoutSlice.loading;
export const error = (state:RootState) => state.logoutSlice.error;