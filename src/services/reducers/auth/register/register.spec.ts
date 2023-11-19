import { clearRegisterError, registerThunk, initialState } from ".";
import { userMock, userResponseFromServerMock } from "../../../../utils/mocks";
import MockAdapter from "axios-mock-adapter";
import registerReducer from "./index";
import axiosInstance from "../../../../utils/api/axiosInstance";
import { IResponseUser } from "../../../../interfaces/IResponseUser";

const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

describe("Action creators and reducer for register", () => {
  afterEach(() => {
    mock.restore();
  });
  it("should return status loading is fulfilled and error undefined for register", async () => {
    mock.onPost("/register", userMock).reply(200, userResponseFromServerMock);
    const data = await axiosInstance.post<IResponseUser>("/register", userMock);
    const action = registerThunk.fulfilled(data, "", userMock);
    expect(registerReducer(initialState, action)).toStrictEqual({
      loading: "succeeded",
      error: undefined,
    });
  });

  it("should return the initial state", () => {
    expect(registerReducer({ ...initialState }, { type: undefined })).toEqual(
      initialState
    );
  });

  it("should return status loading is pending and error undefined for register", () => {
    const action = registerThunk.pending("", userMock);
    expect(registerReducer(initialState, action)).toStrictEqual({
      error: undefined,
      loading: "pending",
    });
  });

  it("should return status loading is failed and error undefined for register", () => {
    const action = registerThunk.rejected(Error("error"), "", userMock);
    expect(registerReducer(initialState, action)).toStrictEqual({
      loading: "failed",
      error: "error",
    });
  });

  it("should return error undefined", () => {
    const action = clearRegisterError();
    expect(registerReducer(initialState, action)).toStrictEqual({
      error: undefined,
      loading: "",
    });
  });
});
