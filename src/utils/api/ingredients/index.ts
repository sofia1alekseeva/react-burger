import { AxiosResponse } from "axios";
import api from "../axiosInstance";
import { ICountIngredient } from "../../../services/reducers/ingredients";

export const getIngredients = (): Promise<
  AxiosResponse<{ data: Array<ICountIngredient>; success: boolean }, any>
> => api.get("/ingredients");
