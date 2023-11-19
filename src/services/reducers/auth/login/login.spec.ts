import { clearLoginError, loginThunk, initialState } from ".";
import { userMock, userResponseFromServerMock } from "../../../../utils/mocks";
import MockAdapter from "axios-mock-adapter";
import loginReducer from "./index";
import axiosInstance from "../../../../utils/api/axiosInstance";
import { IResponseUser } from "../../../../interfaces/IResponseUser";

const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

describe("Action creators and reducer for Login", () => {
  afterEach(() => {
    mock.restore();
  });
  it("should return status loading is fulfilled and error undefined for login", async () => {
    mock.onPost("/login", userMock).reply(200, userResponseFromServerMock);
    const data = await axiosInstance.post<IResponseUser>("/login", userMock);
    const action = loginThunk.fulfilled(data, "", userMock);
    expect(loginReducer(initialState, action)).toStrictEqual({
      loading: "succeeded",
      error: undefined,
    });
  });

  it("should return the initial state", () => {
    expect(loginReducer({ ...initialState }, { type: undefined })).toEqual(
      initialState
    );
  });

  it("should return status loading is pending and error undefined for login", () => {
    const action = loginThunk.pending("", userMock);
    expect(loginReducer(initialState, action)).toStrictEqual({
      error: undefined,
      loading: "pending",
    });
  });

  it("should return status loading is failed and error undefined for login", () => {
    const action = loginThunk.rejected(Error("error"), "", userMock);
    expect(loginReducer(initialState, action)).toStrictEqual({
      loading: "failed",
      error: "error",
    });
  });

  it("should return error undefined", () => {
    const action = clearLoginError();
    expect(loginReducer(initialState, action)).toStrictEqual({
      error: undefined,
      loading: "",
    });
  });
});
