import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "./ingredient-page.module.css";
import * as ingredientsSelector from "../../services/reducers/ingredients/selectors";
import { setIngredientDetails } from "../../services/reducers/ingredient-details";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";
import { IIngredient } from "../../interfaces/IIngredient";
import { useAppDispatch, useAppSelector } from "../../hooks";

const IngredientPage = () => {
  const dispatch = useAppDispatch();
  const ingredients: Array<IIngredient> = useAppSelector(
    ingredientsSelector.ingredients
  );
  const { id } = useParams();
  useEffect(() => {
    if (id && ingredients.length > 0) {
      const ingredient: IIngredient | undefined = ingredients.find(
        (item: IIngredient) => item._id === id
      );
      dispatch(setIngredientDetails(ingredient));
    }
  }, [id, ingredients, dispatch]);
  return (
    <div className={`${styles.mainBlock}`}>
      <h1 className={`${styles.title} text text_type_main-large`}>
        Детали ингредиента
      </h1>
      <IngredientDetails />
    </div>
  );
};

export default IngredientPage;
