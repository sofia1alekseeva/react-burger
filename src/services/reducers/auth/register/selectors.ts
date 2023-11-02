import { RootState } from "../../..";

export const loading = (state:RootState) => state.registerSlice.loading;
export const error = (state:RootState) => state.registerSlice.error;