import { AxiosResponse } from "axios";
import api from "../axiosInstance";
import { IOrderDetails } from "../../../interfaces/IOrderDetails";

export const sendOrderIngredients = (
  ingredientsIds: Array<string>
): Promise<AxiosResponse<IOrderDetails, any>> =>
  api.post(
    "/orders",
    { ingredients: ingredientsIds },
    {
      headers: {
        authorization: localStorage.getItem("accessToken"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
