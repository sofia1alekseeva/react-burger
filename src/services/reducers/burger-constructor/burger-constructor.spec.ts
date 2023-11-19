import { setBun, setMain, deleteMain, resetBurgerConstructor, initialState  } from ".";
import { ingredientDetailsMock } from "../../../utils/mocks";
import burgerConstructorReducer from "./index";

describe("Action creators and reducer for burger-constructor", () => {


    it("should return initial state", () => {
        expect(burgerConstructorReducer(undefined, {type: undefined})).toStrictEqual(initialState);
      });

      it("should delete main", () => {
        const expected = {...initialState, main: [],
        sum: 0}
        const action = deleteMain(ingredientDetailsMock._id);
        expect(burgerConstructorReducer(initialState, action)).toStrictEqual(expected);
      });

      it("should set main", () => {
        const expected = {...initialState, main: [ingredientDetailsMock],
        sum: ingredientDetailsMock.price}
        const action = setMain([ingredientDetailsMock]);
        expect(burgerConstructorReducer(initialState, action)).toStrictEqual(expected);
      });

      it("should set bun", () => {
        const expected = {...initialState, bun: ingredientDetailsMock,
        sum: ingredientDetailsMock.price * 2}
        const action = setBun(ingredientDetailsMock);
        expect(burgerConstructorReducer(initialState, action)).toStrictEqual(expected);
      });

    it("should return initial state by resetBurgerConstructor", () => {
        const action = resetBurgerConstructor();
        expect(burgerConstructorReducer(initialState, action)).toStrictEqual(initialState);
      });
});
