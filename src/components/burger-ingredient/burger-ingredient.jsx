import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css';
import PropTypes from 'prop-types';

export const BurgerIngredient = ({ image, price, name, onClick }) => {
    return (
        <div className={`${styles.mainBlock}`} onClick={onClick}>
            <Counter count={1} size="default" />
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
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,

};