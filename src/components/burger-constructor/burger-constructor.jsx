import { CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useContext, useEffect, useReducer, useState } from 'react';
import styles from './burger-constructor.module.css';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { BurgerConstructorList } from '../burger-constructor-list/burger-constructor-list';
import { BurgerConstructorContext } from '../../services/burgerConstructorContext';
import { sendOrderIngredients } from '../../utils/burger-api';


function reducer(totalPriceState, action) {
    switch (action.type) {
        case "bun":
            return {
                ...totalPriceState,
                bunsPrice: action.bunPrice * 2,
                bunsIds: [action.bunId, action.bunId]
            }
        case "ingredients": {
            return {
                ...totalPriceState,
                ingredientsPrice: action.ingredientsPrice,
                ingredientsIds: action.ingredientsIds
            }
        }
        case "total": {
            return {
                ...totalPriceState,
                totalPrice: totalPriceState.bunsPrice + totalPriceState.ingredientsPrice
            }
        }
        default:
            throw new Error("Wrong action type")
    }
}
const initialState = { totalPrice: 0, ingredientsPrice: 0, bunsPrice: 0, ingredientsIds: [], bunsIds: [] }

export const BurgerConstructor = () => {
    const [ingredients] = useContext(BurgerConstructorContext);
    const [openModal, setOpenModal] = useState(false);
    const [orderState, orderDispatcher] = useReducer(reducer, initialState, undefined);
    const [order, setOrder] = useState({
        name: "",
        order: {
            number: 0
        },
        success: false
    });
    const filteredBun = ingredients.filter(item => item.type === 'bun')[0];

    function sendOrderDetails() {
        const orderDetails = orderState.ingredientsIds.concat(orderState.bunsIds)
        sendOrderIngredients(orderDetails).then(response => setOrder(
            {
                name: response.name,
                order: response.order,
                success: response.success
            })
        )
            .catch((err) => console.log(err));
        setOpenModal(true)
    }


    useEffect(() => {
        if (filteredBun) {
            orderDispatcher({ type: 'bun', bunPrice: filteredBun.price, bunId: filteredBun._id });
        }
        orderDispatcher({ type: 'total' })
    }, [filteredBun])



    return (
        <section>
            <div className={`${styles.burgerConstructor} pt-25`}>
                <div className={`${styles.burgerComponent} mb-4 ml-8`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${filteredBun.name} (верх)`}
                        price={filteredBun.price}
                        thumbnail={filteredBun.image}
                    /></div>
                <div className={`${styles.burgerComponents} custom-scroll mr-4 `}>
                    <BurgerConstructorList orderDispatcher={orderDispatcher} />
                </div>
                <div className={`${styles.burgerComponent} mt-4 ml-8`}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${filteredBun.name} (низ)`}
                        price={filteredBun.price}
                        thumbnail={filteredBun.image}
                    /></div>
                <div className={`${styles.orderInfo} ml-4 mr-4 mt-10`}>
                    <span className={`${styles.totalPrice} text text_type_digits-medium mr-2`}>{orderState.totalPrice}</span>
                    <span className={styles.totalPriceSvg}><CurrencyIcon type="primary" /></span>
                    <Button htmlType="button" type="primary" size="large" extraClass='ml-10' onClick={sendOrderDetails}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
            <Modal active={openModal} setActive={setOpenModal}>
                <OrderDetails orderId={order.order.number} />
            </Modal>
        </section>)
}