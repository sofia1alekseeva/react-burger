import {
  CurrencyIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import styles from "./burger-constructor.module.css";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { BurgerConstructorList } from "../burger-constructor-list/burger-constructor-list";
import * as burgerConstructorSelector from "../../services/reducers/burger-constructor/selectors";
import {
  resetBurgerConstructor,
  setBun,
  setMain,
} from "../../services/reducers/burger-constructor";
import {
  incrementCountIngredient,
  resetCountIngredients,
  setCountBun,
} from "../../services/reducers/ingredients";
import { sendOrderDetailsThunk } from "../../services/reducers/order-details";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { IIngredient } from "../../interfaces/IIngredient";
import { useAppDispatch, useAppSelector } from "../../hooks";

export const BurgerConstructor = () => {
  const navigate = useNavigate();
  const bun = useAppSelector(burgerConstructorSelector.bun);
  const main: Array<IIngredient> = useAppSelector(
    burgerConstructorSelector.main
  );
  const sum: number = useAppSelector(burgerConstructorSelector.sum);
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dropIngredient = (ingredient: IIngredient) => {
    if (ingredient.type === "bun") {
      if (ingredient._id !== bun?._id) {
        dispatch(setBun({ ...ingredient, id: uuidv4() }));
        dispatch(setCountBun(ingredient._id));
      }
    } else {
      dispatch(setMain([{ ...ingredient, id: uuidv4() }, ...main]));
      dispatch(incrementCountIngredient(ingredient._id));
    }
  };

  const [{ isHover }, drop] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop: dropIngredient,
  });

  function sendOrderDetails() {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      bun && localStorage.setItem("bun", JSON.stringify(bun));
      main && localStorage.setItem("main", JSON.stringify(main));
      navigate("/login");
    } else {
      let ingredientsIds: Array<string> = [];
      const buns: Array<string> = [bun?._id || "", bun?._id || ""];
      const mainIngredients: Array<string> = main.map((item) => item._id);
      ingredientsIds = ingredientsIds.concat(buns, mainIngredients);
      dispatch(sendOrderDetailsThunk(ingredientsIds));
      setOpenModal(true);
      dispatch(resetBurgerConstructor());
      dispatch(resetCountIngredients());
      localStorage.removeItem("bun");
      localStorage.removeItem("main");
    }
  }

  useEffect(() => {
    const storageBun = localStorage.getItem("bun");
    const storedBun = storageBun !== null ? JSON.parse(storageBun) : null;
    const storageMain = localStorage.getItem("main");
    const storedMain = storageMain !== null ? JSON.parse(storageMain) : null;
    if (storedBun) {
      dispatch(setBun(storedBun));
    }
    if (storedMain) {
      dispatch(setMain(storedMain));
    }
  }, []);

  return (
    <section>
      <div
        ref={drop}
        className={`${styles.burgerConstructor} pt-5 mt-25 ${
          isHover ? styles.onHover : ""
        }`}
      >
        <div className={`${styles.burgerComponent} mb-4 ml-8`}>
          {bun && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun?.name} (верх)`}
              price={bun?.price}
              thumbnail={bun?.image}
            />
          )}
        </div>
        {!sum && (
          <div className={styles.burgerConstructorEmpty}>
            <h1 className={`text text_type_main-medium`}>
              Поместите ингредиенты сюда
            </h1>
          </div>
        )}
        {main && <BurgerConstructorList />}
        <div className={`${styles.burgerComponent} mt-4 ml-8`}>
          {bun && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun?.name} (низ)`}
              price={bun?.price}
              thumbnail={bun?.image}
            />
          )}
        </div>
        {
          <div className={`${styles.orderInfo} ml-4 mr-4 mt-10`}>
            <span
              className={`${styles.totalPrice} text text_type_digits-medium mr-2`}
            >
              {sum}
            </span>
            <span className={styles.totalPriceSvg}>
              <CurrencyIcon type="primary" />
            </span>
            <Button
              htmlType="button"
              type="primary"
              size="large"
              extraClass="ml-10"
              onClick={sendOrderDetails}
              disabled={!sum}
            >
              Оформить заказ
            </Button>
          </div>
        }
      </div>
      <Modal active={openModal} setActive={setOpenModal}>
        <OrderDetails />
      </Modal>
    </section>
  );
};
