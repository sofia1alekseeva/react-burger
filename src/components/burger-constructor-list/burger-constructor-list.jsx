import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientTypes from "../../utils/propsType";
import PropTypes from 'prop-types';
import styles from './burger-constructor-list.module.css';


export const BurgerConstructorList = ({ingredients}) => {
    const filteredIngredients = ingredients.filter(item => item.type !== 'bun');

    return filteredIngredients.map(item => {
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
    ingredients: PropTypes.arrayOf(ingredientTypes).isRequired
};