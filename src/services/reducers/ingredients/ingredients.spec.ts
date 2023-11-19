import {
  decrementCountIngredient,
  incrementCountIngredient,
  setCountBun,
  resetCountIngredients,
  getIngredientsThunk,
  initialState,
} from ".";
import { ingredientDetailsMock } from "../../../utils/mocks";
import ingredientsReducer from "./index";

describe("Action creators and reducer for ingredientsReducer", () => {
  it("should return the initial state", () => {
    expect(
      ingredientsReducer({ ...initialState }, { type: undefined })
    ).toEqual(initialState);
  });

  const ingredientsMock = {
    data: [{ ...ingredientDetailsMock, count: 2 }],
    success: true,
  };
  it("should return status loading is fulfilled and error undefined for getIngredientsThunk", async () => {
    const action = getIngredientsThunk.fulfilled(ingredientsMock, "");
    expect(ingredientsReducer(initialState, action)).toStrictEqual({
      loading: "succeeded",
      error: undefined,
      ingredients: ingredientsMock.data,
    });
  });

  it("should return status loading is pending and error undefined for getIngredientsThunk", () => {
    const action = getIngredientsThunk.pending("");
    expect(ingredientsReducer(initialState, action)).toStrictEqual({
      error: undefined,
      loading: "pending",
      ingredients: [],
    });
  });

  it("should return status loading is failed and error undefined for getIngredientsThunk", () => {
    const action = getIngredientsThunk.rejected(Error("error"), "");
    expect(ingredientsReducer(initialState, action)).toStrictEqual({
      loading: "failed",
      error: "error",
      ingredients: [],
    });
  });

  it("should set ingredients to initital state", () => {
    const action = resetCountIngredients();
    expect(ingredientsReducer(initialState, action)).toStrictEqual({
      error: undefined,
      loading: "",
      ingredients: [],
    });
  });

  it("should set count bun", () => {
    const action = setCountBun(ingredientsMock.data[0]._id);
    expect(
      ingredientsReducer(
        { ...initialState, ingredients: ingredientsMock.data },
        action
      )
    ).toStrictEqual({
      error: undefined,
      loading: "",
      ingredients: [ingredientsMock.data[0]],
    });
  });

  it("should decrement ingredient count", () => {
    const action = decrementCountIngredient(ingredientsMock.data[0]._id);
    expect(
      ingredientsReducer(
        { ...initialState, ingredients: ingredientsMock.data },
        action
      )
    ).toStrictEqual({
      error: undefined,
      loading: "",
      ingredients: [
        {
          ...ingredientsMock.data[0],
          count: ingredientsMock.data[0].count - 1,
        },
      ],
    });
  });

  it("should increment ingredient count", () => {
    const action = incrementCountIngredient(ingredientsMock.data[0]._id);
    expect(
      ingredientsReducer(
        { ...initialState, ingredients: ingredientsMock.data },
        action
      )
    ).toStrictEqual({
      error: undefined,
      loading: "",
      ingredients: [
        {
          ...ingredientsMock.data[0],
          count: ingredientsMock.data[0].count + 1,
        },
      ],
    });
  });
});
