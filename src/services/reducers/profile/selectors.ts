import { RootState } from "../..";

export const user = (state: RootState) => state.profileSlice.user;
export const loading = (state: RootState) => state.profileSlice.loading;
export const error = (state: RootState) => state.profileSlice.error;
