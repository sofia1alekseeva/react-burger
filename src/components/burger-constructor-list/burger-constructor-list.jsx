import styles from './burger-constructor-list.module.css';
import { useSelector } from 'react-redux';
import * as burgerConstructorSelector from '../../services/reducers/burger-constructor/selectors';
import { BurgerConstructorIngredient } from '../burger-constructor-ingredient/burger-constructor-ingredient';

export const BurgerConstructorList = () => {
    const main = useSelector(burgerConstructorSelector.main);

    return <div className={`${styles.burgerComponents} custom-scroll mr-4`}>
        {main.map(item => <BurgerConstructorIngredient key={item.id} ingredient={item} />)}
    </div>
}