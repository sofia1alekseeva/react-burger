import { setIngredientDetails, resetIngredientDetails, initialState } from ".";
import { ingredientDetailsMock } from "../../../utils/mocks";
import ingredientDetailsReducer from "./index";

describe("Action creators and reducer for ingredient-details", () => {
  it("should return initial state ingredient details", () => {
    expect(ingredientDetailsReducer(undefined, { type: undefined })).toStrictEqual(
      {...initialState}
    );
  });
  it("should return set ingredient details", () => {
    const action = resetIngredientDetails();
    expect(ingredientDetailsReducer(initialState, action)).toStrictEqual(
      initialState
    );
  });

  it("should return initial state", () => {
    const action = setIngredientDetails({...ingredientDetailsMock});
    expect(
      ingredientDetailsReducer(
        { ingredientDetails: ingredientDetailsMock },
        action
      )
    ).toStrictEqual({ingredientDetails: ingredientDetailsMock});
  });
});
