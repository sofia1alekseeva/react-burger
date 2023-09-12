import { useContext, useEffect, useRef, useMemo } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './burger-constructor-list.module.css';
import { BurgerConstructorContext } from '../../services/burgerConstructorContext';

export const BurgerConstructorList = ({ orderDispatcher }) => {
    const [ingredients] = useContext(BurgerConstructorContext);
    const filteredIngredients = useMemo(
        () => ingredients.filter(item => item.type !== 'bun'), [ingredients])
    const priceRef = useRef(0);
    const ingredientsIdsRef = useRef([]);
    useEffect(() => {
        if (filteredIngredients) {
            orderDispatcher({ ingredientsPrice: priceRef.current, ingredientsIds: ingredientsIdsRef.current, type: "ingredients" });
        }

    }, [priceRef, ingredientsIdsRef])
    return filteredIngredients.map(item => {
        priceRef.current += item.price;
        ingredientsIdsRef.current.push(item._id)
        return (<div key={item._id} className={`${styles.burgerComponent} mb-4`}>
            <DragIcon type="primary" />
            <ConstructorElement
                extraClass='ml-2'
                isLocked={item.type === "bun"}
                text={item.name}
                price={item.price}
                thumbnail={item.image
                }
            /></div>)
    })
}

BurgerConstructorList.propTypes = {
    orderDispatcher: PropTypes.func.isRequired
};