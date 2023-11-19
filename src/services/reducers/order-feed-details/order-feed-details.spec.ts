import {
  setOrderFeedDetails,
  clearOrderFeedDetailsData,
  getOrderFeedDetailsThunk,
  initialState,
} from ".";
import {
  ordersDataMock,
} from "../../../utils/mocks";
import orderFeedDetailsReducer from "./index";

describe("Action creators and reducer for orderFeedDetails", () => {
  it("should return status loading is fulfilled and error undefined for orderFeedDetails", async () => {
    const action = getOrderFeedDetailsThunk.fulfilled(
      ordersDataMock.orders[0],
      "",
      ""
    );
    expect(orderFeedDetailsReducer(initialState, action)).toStrictEqual({
      loading: "succeeded",
      error: undefined,
      orderFeedDetails: ordersDataMock.orders[0],
    });
  });

  it("should return the initial state", () => {
    expect(
      orderFeedDetailsReducer({ ...initialState }, { type: undefined })
    ).toEqual(initialState);
  });

  it("should return status loading is pending and error undefined for orderFeedDetails", () => {
    const action = getOrderFeedDetailsThunk.pending("", "");
    expect(orderFeedDetailsReducer(initialState, action)).toStrictEqual({
      ...initialState,
      loading: "pending",
    });
  });

  it("should return status loading is failed and error undefined for orderFeedDetails", () => {
    const action = getOrderFeedDetailsThunk.rejected(Error("error"), "", "");
    expect(orderFeedDetailsReducer(initialState, action)).toStrictEqual({
      ...initialState,
      loading: "failed",
      error: "error",
    });
  });

  it("should set order feed details", () => {
    const order = ordersDataMock.orders[0];
    const expectedOrderObject = {
      error: undefined,
      loading: "",
      orderFeedDetails: order,
    };
    const action = setOrderFeedDetails({ data: ordersDataMock });
    expect(orderFeedDetailsReducer(initialState, action)).toStrictEqual(
      expectedOrderObject
    );
  });

  it("should return error undefined", () => {
    const action = clearOrderFeedDetailsData();
    expect(orderFeedDetailsReducer(initialState, action)).toStrictEqual({
      ...initialState,
      error: undefined,
      loading: "",
    });
  });
});
