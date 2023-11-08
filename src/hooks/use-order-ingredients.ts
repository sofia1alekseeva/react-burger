import { useAppSelector } from ".";
import * as ingredientsSelector from "../services/reducers/ingredients/selectors";
import { ICountIngredient } from "../services/reducers/ingredients";
import {
  TOrderDetailsData,
  TOrderDetailsIngredientsData,
  TOrderFeedItemData,
  TOrdersFeedItemIngredientsData,
} from "../interfaces/IOrderFeed";

export const useOrderIngredients = () => {
  const ingredients = useAppSelector(ingredientsSelector.ingredients);

  const getIngredientsData = (
    ingredientsIds: string[]
  ): Array<ICountIngredient> => {
    const orderIngredients = ingredientsIds.map((id) =>
      ingredients.find((ingredient) => id === ingredient._id)
    );
    const buns = orderIngredients.filter((item) => item?.type === "bun");
    const otherIngredients = orderIngredients.filter(
      (item) => item?.type !== "bun"
    );
    let sortedIngredients = [...otherIngredients];
    if (buns[1]) {
      sortedIngredients.push(buns[1]);
    }
    if (buns[0]) {
      sortedIngredients.unshift(buns[0]);
    }
    return sortedIngredients as Array<ICountIngredient>;
  };

  const getOrderTotalPrice = (
    ingredientsData: Array<ICountIngredient>
  ): number =>
    ingredientsData.reduce((acc, item) => (item ? acc + item.price : acc), 0);

  const getOrderFeedItemIngredientsData = (
    ingredientsData: Array<ICountIngredient>
  ): TOrdersFeedItemIngredientsData[] => {
    const hiddenIngredientsNumber: number | null =
      ingredientsData.length >= 6 ? ingredientsData.length - 5 : null;
    ingredientsData = ingredientsData.slice(0, 6);
    return ingredientsData.map((ingredient) => {
      return {
        image: ingredient.image_mobile,
        name: ingredient.name,
        hiddenIngredientsNumber: hiddenIngredientsNumber,
      };
    });
  };
  const getOrderDetailsIngredientsData = (
    ingredientsData: Array<ICountIngredient>
  ): Array<TOrderDetailsIngredientsData> => {
     const newIngredientsData =  ingredientsData.map((ingredient) => {
      return {
        image: ingredient.image_mobile,
        name: ingredient.name,
        price: ingredient.price,
        count: ingredientsData.filter((item) => item._id === ingredient._id)
          .length
      };
    })
    return newIngredientsData.reduce((o: Array<TOrderDetailsIngredientsData>, i:TOrderDetailsIngredientsData) => {
      if (!o.find((v) => v.name === i.name)) {
        o.push(i);
      }
      return o;
    }, []);
  };

  const getOrderFeedItemData = (
    ingredientsIds: string[]
  ): TOrderFeedItemData => {
    const ingredientsData = getIngredientsData(ingredientsIds);
    const orderTotalPrice = getOrderTotalPrice(ingredientsData);
    const orderFeedItemIngredientsData =
      getOrderFeedItemIngredientsData(ingredientsData);
    return {
      ingredientsInfo: orderFeedItemIngredientsData,
      totalPrice: orderTotalPrice,
    };
  };

  const getOrderIngredientsTotalData = (
    ingredientsIds: string[]
  ): TOrderDetailsData => {
    const ingredientsData = getIngredientsData(ingredientsIds);
    const orderTotalPrice = getOrderTotalPrice(ingredientsData);
    const orderIngredientsData =
      getOrderDetailsIngredientsData(ingredientsData);
    return {
      ingredientsInfo: orderIngredientsData,
      totalPrice: orderTotalPrice,
    };
  };

  return {
    getOrderFeedItemData,
    getOrderIngredientsTotalData,
  };
};
