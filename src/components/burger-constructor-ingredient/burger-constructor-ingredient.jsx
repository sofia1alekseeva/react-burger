import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import styles from './burger-constructor-ingredient.module.css';
import ingredientTypes from '../../utils/propsType';
import { deleteMain, setMain } from '../../services/reducers/burger-constructor';
import { decrementCountIngredient } from '../../services/reducers/ingredients';
import * as burgerConstructorSelector from '../../services/reducers/burger-constructor/selectors';
import PropTypes from 'prop-types';


export const BurgerConstructorIngredient = ({ ingredient }) => {
    const main = useSelector(burgerConstructorSelector.main);
    const dispatch = useDispatch();

    const removeMain = (item) => {
        dispatch(deleteMain(item.id));
        dispatch(
            decrementCountIngredient(item._id)
        );
    }

    const dropHandler = (dropIngredient) => {
        const indexIngredient = main.findIndex((item) => item.id === ingredient.id);
        const indexDropIngredient = main.findIndex(
            (item) => item.id === dropIngredient.id,
        );
        let mainDisposition = [
            ...main
        ];

        if (indexIngredient < indexDropIngredient) {
            mainDisposition.splice(indexDropIngredient, 1);
            mainDisposition.splice(indexIngredient, 0, dropIngredient);
        } else {
            mainDisposition.splice(indexIngredient + 1, 0, dropIngredient);
            mainDisposition.splice(indexDropIngredient, 1);
        }
        dispatch(setMain(mainDisposition));
    };

    const [
        { handlerId },
        drop,
    ] = useDrop({
        accept: 'ingredient-drag',
        hover: (dropIngredient, monitor) => {
            !monitor.isOver() && dropHandler(dropIngredient);
        },
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
    });

    const [
        { opacity },
        drag,
    ] = useDrag({
        item: ingredient,
        type: 'ingredient-drag',
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0 : 1
        }),
    });

    return <div ref={drop}>
        <div style={{ opacity }} ref={drag} data-handler-id={handlerId} className={`${styles.burgerComponent} mb-4`} >
            <DragIcon type="primary" />
            <ConstructorElement
                extraClass='ml-2'
                isLocked={false}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => removeMain(ingredient)}
            /></div></div>

}

BurgerConstructorIngredient.propTypes = {
    ingredient: ingredientTypes
};