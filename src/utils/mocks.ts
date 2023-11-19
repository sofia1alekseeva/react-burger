import { IResponseMessage } from "../interfaces/IResponseMessage";
import { IResponseUser } from "../interfaces/IResponseUser";

export const userMock = {
  email: "mock@email.com",
  name: "Sofia",
  password: "password",
};
export const userResponseFromServerMock: IResponseUser = {
  success: true,
  user: { email: "mock@email.com", name: "Sofia" },
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};

export const responseMessageSuccess: IResponseMessage = {
  success: true,
  message: "message",
};
export const newPasswordMock = { password: "password" };

export const errorMessageMock = "Error";
export const errorMock = new Error(errorMessageMock);
export const ingredientDetailsMock = {
  _id: "60666c42cc7b410027a1a9b1",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
};

export const ingredientsIdsMock = [
  "60d3b41abdacab0026a733c7",
  "60d3b41abdacab0026a733cf",
  "60d3b41abdacab0026a733cc",
  "60d3b41abdacab0026a733c7",
];

const order = {
  createdAt: "2023-06-29T16:04:41.149Z",
  ingredients: [
    "60d3b41abdacab0026a733c7",
    "60d3b41abdacab0026a733cf",
    "60d3b41abdacab0026a733cc",
    "60d3b41abdacab0026a733c7",
  ],
  name: "Антарианский флюоресцентный spicy бургер",
  number: 18717,
  status: "done",
  updatedAt: "2023-06-29T16:04:41.319Z",
  _id: "62bc781942d34a001c271072",
};

export const ordersDataMock = {
  orders: [{ ...order }, { ...order }, { ...order }],
  total: 550,
  totalToday: 50,
  success: true,
};

export const orderMock = {
  order: { ...order },
};