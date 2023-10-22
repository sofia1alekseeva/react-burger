import { AxiosResponse } from "axios";
import api from "../axiosInstance";
import { IResponseUser } from "../../../interfaces/IResponseUser";
import { IResponseMessage } from "../../../interfaces/IResponseMessage";

export interface IRegistrationData {
  email: string;
  password: string;
  name: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export const sendRegistrationData = (
  data: IRegistrationData
): Promise<AxiosResponse<IResponseUser, any>> =>
  api.post("/auth/register", data);

export const sendLoginData = (
  data: ILoginData
): Promise<AxiosResponse<IResponseUser, any>> => api.post("/auth/login", data);

export const sendLogoutData = (): Promise<
  AxiosResponse<IResponseMessage, any>
> => api.post("/auth/logout", { token: localStorage.getItem("refreshToken") });

export const getUserData = (): Promise<AxiosResponse<IResponseUser, any>> =>
  api.get("/auth/user", {
    headers: {
      authorization: localStorage.getItem("accessToken"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export const updateUserData = (
  data: IRegistrationData
): Promise<AxiosResponse<IResponseUser, any>> =>
  api.patch("/auth/user", data, {
    headers: {
      authorization: localStorage.getItem("accessToken"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
