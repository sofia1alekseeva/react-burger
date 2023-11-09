import { AxiosResponse } from "axios";
import api from "../axiosInstance";
import { IOrderDetails } from "../../../interfaces/IOrderDetails";
import { TOrderFeed, TOrdersFeed } from "../../../interfaces/IOrderFeed";

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

export const getAllOrdersData = (): Promise<AxiosResponse<TOrdersFeed, any>> =>
  api.get("/orders/all");

export const getOrderFeedDetails = (
  orderNumber: string
): Promise<AxiosResponse<TOrdersFeed, any>> =>
  api.get(`/orders/${orderNumber}`);
