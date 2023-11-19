import { clearOrderDetailsError, sendOrderDetailsThunk, initialState } from ".";
import {
  ingredientsIdsMock,
  orderMock,
  userMock,
  userResponseFromServerMock,
} from "../../../utils/mocks";
import MockAdapter from "axios-mock-adapter";
import orderDetailsReducer from "./index";
import axiosInstance from "../../../utils/api/axiosInstance";
import { IOrderDetails } from "../../../interfaces/IOrderDetails";

const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

describe("Action creators and reducer for orderDetails", () => {
  afterEach(() => {
    mock.restore();
  });

  it("should return status loading is fulfilled and error undefined for orderDetails", async () => {
    const ingredients = { ingredients: ingredientsIdsMock };
    mock.onPost("/orderDetails", ingredients).reply(200, orderMock);
    const data = await axiosInstance.post("/orderDetails", ingredients);
    const action = sendOrderDetailsThunk.fulfilled(
      data,
      "",
      ingredientsIdsMock
    );
    expect(orderDetailsReducer(initialState, action)).toStrictEqual({
      loading: "succeeded",
      error: undefined,
      orderDetails: orderMock,
    });
  });

  it("should return the initial state", () => {
    expect(
      orderDetailsReducer({ ...initialState }, { type: undefined })
    ).toEqual(initialState);
  });

  it("should return status loading is pending and error undefined for orderDetails", () => {
    const action = sendOrderDetailsThunk.pending("", ingredientsIdsMock);
    expect(orderDetailsReducer(initialState, action)).toStrictEqual({
      ...initialState,
      loading: "pending",
    });
  });

  it("should return status loading is failed and error undefined for orderDetails", () => {
    const action = sendOrderDetailsThunk.rejected(
      Error("error"),
      "",
      ingredientsIdsMock
    );
    expect(orderDetailsReducer(initialState, action)).toStrictEqual({
      ...initialState,
      loading: "failed",
      error: "error",
    });
  });

  it("should return error undefined", () => {
    const action = clearOrderDetailsError();
    expect(orderDetailsReducer(initialState, action)).toStrictEqual({
      ...initialState,
      error: undefined,
      loading: "",
    });
  });
});
