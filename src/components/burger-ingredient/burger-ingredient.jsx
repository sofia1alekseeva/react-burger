import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export const BurgerIngredient = ({ item, onClick }) => {
    const {image, price, name, count} = item;
    const id = uuidv4();
    const [{opacity}, dragRef] = useDrag({
        type: "ingredient",
        item: {...item, id: id},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });
    return (
        <div ref={dragRef} style={{opacity}} className={`${styles.mainBlock}`} onClick={onClick}>
            {!!count && <Counter count={count} size="default" extraClass={styles.counter}/>}
            <img className={styles.image} alt={name} src={image} />
            <div className={styles.priceBlock}>
                <p className="text text_type_digits-default mr-2">
                    {price}
                </p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${styles.name} text text_type_main-default mt-2 mb-6`}>
                {name}
            </p>
        </div>
    )
}

BurgerIngredient.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};