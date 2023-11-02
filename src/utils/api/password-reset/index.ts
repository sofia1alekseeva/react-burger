import { AxiosResponse } from "axios";
import api from "../axiosInstance";
import { IResponseMessage } from "../../../interfaces/IResponseMessage";

interface IForgotPassword {
  email: string;
}

interface IResetPassword {
  password: string;
  token: string;
}

export const sendForgotPasswordData = (
  data: IForgotPassword
): Promise<AxiosResponse<IResponseMessage, any>> =>
  api.post("/password-reset", data);

export const sendResetPasswordData = (
  data: IResetPassword
): Promise<AxiosResponse<IResponseMessage, any>> =>
  api.post("/password-reset/reset", data);
