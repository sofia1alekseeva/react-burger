import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useMemo, useRef } from 'react'
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient'
import styles from './burger-ingredients.module.css'
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { useSelector, useDispatch } from 'react-redux';
import * as ingredientsSelector from '../../services/reducers/ingredients/selectors';
import { setIngredientDetails } from '../../services/reducers/ingredient-details';
import { useLocation, useNavigate } from 'react-router-dom';

const title = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки"
}

export const BurgerIngredients = () => {
    const navigate = useNavigate();

    const [current, setCurrent] = useState('bun')
    // const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    const ingredients = useSelector(ingredientsSelector.ingredients);
    const setTab = (tab) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };



    const tabsRef = useRef(null);
    const bunsRef = useRef(null);
    const saucesRef = useRef(null);
    const mainRef = useRef(null);

    const buns = useMemo(() => ingredients.filter((item) => item?.type === 'bun'), [ingredients]);
    const main = useMemo(() => ingredients.filter((item) => item?.type === 'main'), [ingredients]);
    const sauces = useMemo(() => ingredients.filter((item) => item?.type === 'sauce'), [ingredients]);

    const handleScroll = () => {
        const bunsDistance = Math.abs(tabsRef.current.getBoundingClientRect().top - bunsRef.current.getBoundingClientRect().top)
        const saucesDistance = Math.abs(tabsRef.current.getBoundingClientRect().top - saucesRef.current.getBoundingClientRect().top)
        const mainDistance = Math.abs(tabsRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top)
        const minDistance = Math.min(bunsDistance, saucesDistance, mainDistance);
        const currentHeader = minDistance === bunsDistance ? 'bun' : minDistance === saucesDistance ? 'sauce' : 'main';
        setCurrent(prevState => (currentHeader === prevState.current ? prevState.current : currentHeader))
    }


    const openIngredients = (item) => {
        // setOpenModal(true);
        navigate(`ingredients/${item._id}`, {state: {
            isOpenModal: true
        }})
    }

    const renderList = (array) => {
        if (!array.length) return null;
        const getRef = (type) => type === 'bun' ? bunsRef : type === 'sauce' ? saucesRef : mainRef;
        return (
            <div>
                <p id={array[0].type} ref={getRef(array[0].type)} className={`text text_type_main-medium mt-10 mb-6`}>{title[array[0].type]}</p>
                <div className={`${styles.ingredientsType} pl-4`}>{array.map(item => (
                    <BurgerIngredient key={item._id} item={item} onClick={() => openIngredients(item)} />
                ))}</div>
            </div>)
    }

    return (<section className={`${styles.mainBlock} mr-10`}>
        <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
        <div ref={tabsRef} className={styles.tabs}>
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
        <div className={`${styles.ingredients} custom-scroll`} onScroll={handleScroll} >
            {renderList(buns)}
            {renderList(sauces)}
            {renderList(main)}
        </div>
        {}
        {/* {<Modal active={openModal} setActive={setOpenModal} title="Детали ингредиента">
            <IngredientDetails />
        </Modal>} */}
    </section>)
}