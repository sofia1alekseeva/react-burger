import { IUser } from "./IUser";

export interface IResponseUser {
    success: boolean;
    user: IUser;
    accessToken?: string,
    refreshToken?: string
  };