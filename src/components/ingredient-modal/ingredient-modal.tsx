import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Modal } from "../modal/modal";
import { useEffect } from "react";
import { setIngredientDetails } from "../../services/reducers/ingredient-details";
import * as ingredientsSelector from "../../services/reducers/ingredients/selectors";
import { IIngredient } from "../../interfaces/IIngredient";
import { useAppDispatch, useAppSelector } from "../../hooks";

const IngredientModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(ingredientsSelector.ingredients);
  const { id } = useParams();
  useEffect(() => {
    if (id && ingredients.length > 0) {
      const ingredient: IIngredient | undefined = ingredients.find(
        (item: IIngredient) => item._id === id
      );
      dispatch(setIngredientDetails(ingredient));
    }
  }, [id, ingredients, dispatch]);

  const handleClose = () => {
    const copiedState = { ...location.state };
    delete copiedState.isOpenModal;
    navigate("/", { state: copiedState });
  };

  return (
    <Modal active={true} setActive={handleClose} title="Детали ингредиента">
      <IngredientDetails />
    </Modal>
  );
};

export default IngredientModal;
