import { clearResetPasswordError, resetPasswordThunk, initialState } from ".";
import {
  responseMessageSuccess,
  userMock,
  userResponseFromServerMock,
} from "../../../../utils/mocks";
import MockAdapter from "axios-mock-adapter";
import resetPasswordReducer from "./index";
import axiosInstance from "../../../../utils/api/axiosInstance";

const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

describe("Action creators and reducer for reset password", () => {
  afterEach(() => {
    mock.restore();
  });
  const body = { ...userMock, token: "token" };
  it("should return status loading is fulfilled and error undefined for resetPassword", async () => {
    mock.onPost("/resetPassword", body).reply(200, responseMessageSuccess);
    const data = await axiosInstance.post("/resetPassword", body);
    const action = resetPasswordThunk.fulfilled(data, "", body);
    expect(resetPasswordReducer(initialState, action)).toStrictEqual({
      loading: "succeeded",
      error: undefined,
    });
  });

  it("should return the initial state", () => {
    expect(
      resetPasswordReducer({ ...initialState }, { type: undefined })
    ).toEqual(initialState);
  });

  it("should return status loading is pending and error undefined for resetPassword", () => {
    const action = resetPasswordThunk.pending("", body);
    expect(resetPasswordReducer(initialState, action)).toStrictEqual({
      error: undefined,
      loading: "pending",
    });
  });

  it("should return status loading is failed and error undefined for resetPassword", () => {
    const action = resetPasswordThunk.rejected(Error("error"), "", body);
    expect(resetPasswordReducer(initialState, action)).toStrictEqual({
      loading: "failed",
      error: "error",
    });
  });

  it("should return error undefined", () => {
    const action = clearResetPasswordError();
    expect(resetPasswordReducer(initialState, action)).toStrictEqual({
      error: undefined,
      loading: "",
    });
  });
});
