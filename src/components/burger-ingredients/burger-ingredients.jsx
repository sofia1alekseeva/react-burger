import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useRef } from 'react'
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient'
import styles from './burger-ingredients.module.css'
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import ingredientTypes from "../../utils/propsType";
import PropTypes from 'prop-types';

const title = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки"
}

export const BurgerIngredients = ({ ingredients }) => {
    const [current, setCurrent] = useState('bun')
    const [openModal, setOpenModal] = useState(false);

    const ingredientsRef = useRef(null);

    const setTab = (tab) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    const buns = ingredients.filter((item) => item?.type === 'bun');
    const main = ingredients.filter((item) => item?.type === 'main');
    const sauces = ingredients.filter((item) => item?.type === 'sauce');

    const openIngredients = (item) => {
        ingredientsRef.current = item
        if (ingredientsRef.current) {
            setOpenModal(true);
        }
    }

    const renderList = (array) => {
        if (!array.length) return null;
        return (
            <div>
                <p id={array[0].type} className={`text text_type_main-medium mt-10 mb-6`}>{title[array[0].type]}</p>
                <div className={`${styles.ingredientsType} pl-4`}>{array.map(item => (
                    <BurgerIngredient key={item._id} image={item.image} price={item.price} name={item.name} onClick={() => openIngredients(item)} />
                ))}</div>
            </div>)
    }

    return (<section className={`${styles.mainBlock} mr-10`}>
        <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
        <div className={styles.tabs}>
            <Tab value="bun" active={current === 'bun'} onClick={setTab}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={setTab}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={setTab}>
                Начинки
            </Tab>
        </div>
        <div className={`${styles.ingredients} custom-scroll`}>
            {renderList(buns)}
            {renderList(sauces)}
            {renderList(main)}
        </div>
        {ingredientsRef.current && <Modal active={openModal} setActive={setOpenModal} title="Детали ингредиента">
            <IngredientDetails ingredientDetails={ingredientsRef.current} />
        </Modal>}
    </section>)
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientTypes).isRequired
};