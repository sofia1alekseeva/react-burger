import { clearForgotPasswordError, forgotPasswordThunk, initialState } from ".";
import { userMock, userResponseFromServerMock } from "../../../../utils/mocks";
import MockAdapter from "axios-mock-adapter";
import forgotPasswordReducer from "./index";
import axiosInstance from "../../../../utils/api/axiosInstance";

const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

describe("Action creators and reducer for forgot password", () => {
  afterEach(() => {
    mock.restore();
  });
  it("should return status loading is fulfilled and error undefined for forgotPassword", async () => {
    mock.onPost("/forgotPassword", userMock).reply(200, userResponseFromServerMock);
    const data = await axiosInstance.post("/forgotPassword", userMock);
    const action = forgotPasswordThunk.fulfilled(data, "", userMock);
    expect(forgotPasswordReducer(initialState, action)).toStrictEqual({
      loading: "succeeded",
      error: undefined,
    });
  });

  it("should return the initial state", () => {
    expect(forgotPasswordReducer({ ...initialState }, { type: undefined })).toEqual(
      initialState
    );
  });

  it("should return status loading is pending and error undefined for forgotPassword", () => {
    const action = forgotPasswordThunk.pending("", userMock);
    expect(forgotPasswordReducer(initialState, action)).toStrictEqual({
      error: undefined,
      loading: "pending",
    });
  });

  it("should return status loading is failed and error undefined for forgotPassword", () => {
    const action = forgotPasswordThunk.rejected(Error("error"), "", userMock);
    expect(forgotPasswordReducer(initialState, action)).toStrictEqual({
      loading: "failed",
      error: "error",
    });
  });

  it("should return error undefined", () => {
    const action = clearForgotPasswordError();
    expect(forgotPasswordReducer(initialState, action)).toStrictEqual({
      error: undefined,
      loading: "",
    });
  });
});
