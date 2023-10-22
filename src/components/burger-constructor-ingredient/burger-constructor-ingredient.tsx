import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import styles from "./burger-constructor-ingredient.module.css";
import {
  deleteMain,
  setMain,
} from "../../services/reducers/burger-constructor";
import { decrementCountIngredient } from "../../services/reducers/ingredients";
import * as burgerConstructorSelector from "../../services/reducers/burger-constructor/selectors";
import { FC } from "react";
import { IIngredient } from "../../interfaces/IIngredient";
import { useAppDispatch, useAppSelector } from "../../hooks";

export const BurgerConstructorIngredient: FC<{ ingredient: IIngredient }> = ({
  ingredient,
}) => {
  const main = useAppSelector(burgerConstructorSelector.main);
  const dispatch = useAppDispatch();

  const removeMain = (item: IIngredient) => {
    dispatch(deleteMain(item.id));
    dispatch(decrementCountIngredient(item._id));
  };

  const dropHandler = (dropIngredient: IIngredient) => {
    const indexIngredient = main.findIndex(
      (item: IIngredient) => item.id === ingredient.id
    );
    const indexDropIngredient = main.findIndex(
      (item: IIngredient) => item.id === dropIngredient.id
    );
    let mainDisposition = [...main];

    if (indexIngredient < indexDropIngredient) {
      mainDisposition.splice(indexDropIngredient, 1);
      mainDisposition.splice(indexIngredient, 0, dropIngredient);
    } else {
      mainDisposition.splice(indexIngredient + 1, 0, dropIngredient);
      mainDisposition.splice(indexDropIngredient, 1);
    }
    dispatch(setMain(mainDisposition));
  };

  const [{ handlerId }, drop] = useDrop({
    accept: "ingredient-drag",
    hover: (dropIngredient: IIngredient, monitor) => {
      !monitor.isOver() && dropHandler(dropIngredient);
    },
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
  });

  const [{ opacity }, drag] = useDrag({
    item: ingredient,
    type: "ingredient-drag",
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  return (
    <div ref={drop}>
      <div
        style={{ opacity }}
        ref={drag}
        data-handler-id={handlerId}
        className={`${styles.burgerComponent} mb-4`}
      >
        <DragIcon type="primary" />
        <ConstructorElement
          extraClass="ml-2"
          isLocked={false}
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => removeMain(ingredient)}
        />
      </div>
    </div>
  );
};
