import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useMemo, useRef, MutableRefObject } from "react";
import { BurgerIngredient } from "../burger-ingredient/burger-ingredient";
import styles from "./burger-ingredients.module.css";
import * as ingredientsSelector from "../../services/reducers/ingredients/selectors";
import { useNavigate } from "react-router-dom";
import { IIngredient } from "../../interfaces/IIngredient";
import { useAppSelector } from "../../hooks";

interface ITitle {
  [name: string]: string;
}

const title: ITitle = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

export const BurgerIngredients = () => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState<string>("bun");
  const ingredients = useAppSelector(ingredientsSelector.ingredients);
  const setTab = (tab: string): void => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const tabsRef = useRef() as MutableRefObject<HTMLDivElement>;
  const bunsRef = useRef() as MutableRefObject<HTMLDivElement>;
  const saucesRef = useRef() as MutableRefObject<HTMLDivElement>;
  const mainRef = useRef() as MutableRefObject<HTMLDivElement>;

  const buns: Array<IIngredient> = useMemo(
    () => ingredients.filter((item) => item?.type === "bun"),
    [ingredients]
  );
  const main: Array<IIngredient> = useMemo(
    () => ingredients.filter((item) => item?.type === "main"),
    [ingredients]
  );
  const sauces: Array<IIngredient> = useMemo(
    () => ingredients.filter((item) => item?.type === "sauce"),
    [ingredients]
  );

  const handleScroll = (): void => {
    const bunsDistance = Math.abs(
      tabsRef.current.getBoundingClientRect().top -
        bunsRef.current.getBoundingClientRect().top
    );
    const saucesDistance = Math.abs(
      tabsRef.current.getBoundingClientRect().top -
        saucesRef.current.getBoundingClientRect().top
    );
    const mainDistance = Math.abs(
      tabsRef.current.getBoundingClientRect().top -
        mainRef.current.getBoundingClientRect().top
    );
    const minDistance = Math.min(bunsDistance, saucesDistance, mainDistance);
    const currentHeader =
      minDistance === bunsDistance
        ? "bun"
        : minDistance === saucesDistance
        ? "sauce"
        : "main";
    setCurrent((prevState) =>
      currentHeader === prevState ? prevState : currentHeader
    );
  };

  const openIngredients = (item: IIngredient): void => {
    navigate(`ingredients/${item._id}`, {
      state: {
        isOpenModal: true,
      },
    });
  };

  const renderList = (array: Array<IIngredient>): React.ReactNode | null => {
    if (!array.length) return null;
    const getRef = (type: string) =>
      type === "bun" ? bunsRef : type === "sauce" ? saucesRef : mainRef;
    return (
      <div>
        <p
          id={array[0].type}
          ref={getRef(array[0].type)}
          className={`text text_type_main-medium mt-10 mb-6`}
        >
          {title[array[0].type]}
        </p>
        <div className={`${styles.ingredientsType} pl-4`}>
          {array.map((item) => (
            <BurgerIngredient
              key={item._id}
              item={item}
              onClick={() => openIngredients(item)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className={`${styles.mainBlock} mr-10`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div ref={tabsRef} className={styles.tabs}>
        <Tab value="bun" active={current === "bun"} onClick={setTab}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setTab}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setTab}>
          Начинки
        </Tab>
      </div>
      <div
        className={`${styles.ingredients} custom-scroll`}
        onScroll={handleScroll}
      >
        {renderList(buns)}
        {renderList(sauces)}
        {renderList(main)}
      </div>
    </section>
  );
};
