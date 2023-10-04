import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from "./ingredient-page.module.css"
import  * as ingredientsSelector  from "../../services/reducers/ingredients/selectors";
import { setIngredientDetails } from "../../services/reducers/ingredient-details";
import { IngredientDetails } from "../../components/ingredient-details/ingredient-details";
import Loader from "../../components/loader/loader";

const IngredientPage = () => {
    const dispatch = useDispatch();
    const ingredients = useSelector(ingredientsSelector.ingredients);
    const loading = useSelector(ingredientsSelector.loading);
    const isLoading = loading === 'pending';
    const {id} = useParams();
    useEffect(
        () => {
            console.log("id", id)
            console.log("ingredients", ingredients)
          if (id && ingredients.length > 0){
            const ingredient = ingredients.find((item) => item._id === id);
            console.log("ingredient",ingredient)
            dispatch(setIngredientDetails(ingredient));}
        },
        [
          id,
          ingredients,
          dispatch,
        ],
      );
    return isLoading ? (<Loader/>) :( <div className={`${styles.mainBlock}`}>
        <h1 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h1>
        <IngredientDetails/></div>)
}

export default IngredientPage;