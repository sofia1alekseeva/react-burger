import { clearLogoutError, logoutThunk, initialState } from ".";
import { userMock, userResponseFromServerMock } from "../../../../utils/mocks";
import MockAdapter from "axios-mock-adapter";
import logoutReducer from "./index";
import axiosInstance from "../../../../utils/api/axiosInstance";
import { IResponseMessage } from "../../../../interfaces/IResponseMessage";

const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

describe("Action creators and reducer for logout", () => {
  afterEach(() => {
    mock.restore();
  });

  it("should return status loading is fulfilled and error undefined for logout", async () => {
    mock.onPost("/logout", userMock).reply(200, userResponseFromServerMock);
    const data = await axiosInstance.post<IResponseMessage>("/logout", userMock);
    const action = logoutThunk.fulfilled(data, "");
    expect(logoutReducer(initialState, action)).toStrictEqual({
      loading: "succeeded",
      error: undefined,
    });
  });

  it("should return the initial state", () => {
    expect(logoutReducer({ ...initialState }, { type: undefined })).toEqual(
      initialState
    );
  });

  it("should return status loading is pending and error undefined for logout", () => {
    const action = logoutThunk.pending("");
    expect(logoutReducer(initialState, action)).toStrictEqual({
      error: undefined,
      loading: "pending",
    });
  });

  it("should return status loading is failed and error undefined for logout", () => {
    const action = logoutThunk.rejected(Error("error"), "");
    expect(logoutReducer(initialState, action)).toStrictEqual({
      loading: "failed",
      error: "error",
    });
  });

  it("should return error undefined", () => {
    const action = clearLogoutError();
    expect(logoutReducer(initialState, action)).toStrictEqual({
      error: undefined,
      loading: "",
    });
  });
});
