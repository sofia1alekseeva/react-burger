import {
  clearProfileError,
  getUserThunk,
  updateUserThunk,
  initialState,
  resetUser
} from ".";
import { userMock, userResponseFromServerMock } from "../../../utils/mocks";
import profileReducer from "./index";


describe("Action creators and reducer for get user data and update user data", () => {

  it("should return the initial state", () => {
    expect(profileReducer({ ...initialState }, { type: undefined })).toEqual(
      initialState
    );
  });

  it("should return status loading is fulfilled and error undefined for updateUserThunk", async () => {
    const action = updateUserThunk.fulfilled(
      userResponseFromServerMock,
      "",
      userMock
    );
    expect(profileReducer(initialState, action)).toStrictEqual({
      loading: "succeeded",
      error: undefined,
      user: { email: userMock.email, name: userMock.name },
    });
  });

  it("should return status loading is pending and error undefined for updateUserThunk", () => {
    const action = updateUserThunk.pending("", userMock);
    expect(profileReducer(initialState, action)).toStrictEqual({
      error: undefined,
      loading: "pending",
      user: null,
    });
  });

  it("should return status loading is failed and error undefined for updateUserThunk", () => {
    const action = updateUserThunk.rejected(Error("error"), "", userMock);
    expect(profileReducer(initialState, action)).toStrictEqual({
      loading: "failed",
      error: "error",
      user: null,
    });
  });


  it("should return status loading is fulfilled and error undefined for getUserThunk", async () => {
    const action = getUserThunk.fulfilled(
      userResponseFromServerMock,
      ""
    );
    expect(profileReducer(initialState, action)).toStrictEqual({
      loading: "succeeded",
      error: undefined,
      user: { email: userMock.email, name: userMock.name },
    });
  });

  it("should return status loading is pending and error undefined for getUserThunk", () => {
    const action = getUserThunk.pending("");
    expect(profileReducer(initialState, action)).toStrictEqual({
      error: undefined,
      loading: "pending",
      user: null,
    });
  });

  it("should return status loading is failed and error undefined for getUserThunk", () => {
    const action = getUserThunk.rejected(Error("error"), "");
    expect(profileReducer(initialState, action)).toStrictEqual({
      loading: "failed",
      error: "error",
      user: null,
    });
  });

  it("should reset user", () => {
    const action = resetUser();
    expect(profileReducer(initialState, action)).toStrictEqual({
      error: undefined,
      loading: "",
      user: null,
    });
  });
  it("should return error undefined", () => {
    const action = clearProfileError();
    expect(profileReducer(initialState, action)).toStrictEqual({
      error: undefined,
      loading: "",
      user: null,
    });
  });
});
