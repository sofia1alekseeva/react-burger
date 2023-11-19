import {
  clearOrdersError,
  setOrdersData,
  clearOrdersData,
  wsOrdersInit,
  wsOrdersClose,
  wsOrdersError,
  initialState,
} from ".";
import { ordersDataMock } from "../../../utils/mocks";
import ordersFeedReducer from "./index";

describe("Action creators and reducer for ordersFeed", () => {
  it("should return the initial state", () => {
    expect(ordersFeedReducer({ ...initialState }, { type: undefined })).toEqual(
      initialState
    );
  });

  it("should wsOrdersError", () => {
    const expectedOrderObject = {
      ...initialState,
      error: "error"
    };
    const action = wsOrdersError("error");
    expect(ordersFeedReducer(initialState, action)).toStrictEqual(
      expectedOrderObject
    );
  });

  it("should wsOrdersClose", () => {
    const expectedOrderObject = {
      ...initialState,
      isSocket: false
    };
    const action = wsOrdersClose();
    expect(ordersFeedReducer(initialState, action)).toStrictEqual(
      expectedOrderObject
    );
  });

  it("should wsInit", () => {
    const expectedOrderObject = {
      ...initialState,
      socketUrl: "socketUrl",
    };
    const action = wsOrdersInit("socketUrl");
    expect(ordersFeedReducer(initialState, action)).toStrictEqual(
      expectedOrderObject
    );
  });

  it("should set order feed data", () => {
    const expectedOrderObject = {
      ...initialState,
      ordersFeedData: ordersDataMock,
    };
    const action = setOrdersData(ordersDataMock);
    expect(ordersFeedReducer(initialState, action)).toStrictEqual(
      expectedOrderObject
    );
  });


  it("should clear order feed data", () => {
    const expectedOrderObject = {
      ...initialState,
      ordersFeedData: null,
    };
    const action = clearOrdersData();
    expect(ordersFeedReducer(initialState, action)).toStrictEqual(
      expectedOrderObject
    );
  });
  
  it("should return error undefined", () => {
    const action = clearOrdersError();
    expect(ordersFeedReducer(initialState, action)).toStrictEqual({
      ...initialState,
      error: undefined
    });
  });
});
