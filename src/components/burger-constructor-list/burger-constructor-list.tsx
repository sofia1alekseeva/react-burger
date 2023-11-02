import styles from "./burger-constructor-list.module.css";
import * as burgerConstructorSelector from "../../services/reducers/burger-constructor/selectors";
import { BurgerConstructorIngredient } from "../burger-constructor-ingredient/burger-constructor-ingredient";
import { IIngredient } from "../../interfaces/IIngredient";
import { useAppSelector } from "../../hooks";

export const BurgerConstructorList = () => {
  const main = useAppSelector(burgerConstructorSelector.main);

  return (
    <div className={`${styles.burgerComponents} custom-scroll mr-4`}>
      {main.map((item: IIngredient) => (
        <BurgerConstructorIngredient key={item.id} ingredient={item} />
      ))}
    </div>
  );
};
