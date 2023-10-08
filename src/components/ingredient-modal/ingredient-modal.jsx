import { useLocation, useNavigate, useParams } from "react-router-dom"
import { IngredientDetails } from "../ingredient-details/ingredient-details"
import { Modal } from "../modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setIngredientDetails } from "../../services/reducers/ingredient-details";
import  * as ingredientsSelector  from "../../services/reducers/ingredients/selectors";

const IngredientModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const ingredients = useSelector(ingredientsSelector.ingredients);
    const {id} = useParams();
    useEffect(
        () => {
          if (id && ingredients.length > 0){
            const ingredient = ingredients.find((item) => item._id === id);
            dispatch(setIngredientDetails(ingredient));}
        },
        [
          id,
          ingredients,
          dispatch,
        ],
      );

    const handleClose = () => {
        const copiedState = { ...location.state };
        delete copiedState.isOpenModal;
        navigate('/', { state: copiedState })
    }

    return (<Modal active={true} setActive={handleClose} title="Детали ингредиента">
        <IngredientDetails />
    </Modal>)
}

export default IngredientModal